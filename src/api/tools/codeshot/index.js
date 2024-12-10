import puppeteer from 'puppeteer';
import { createError } from '../../lib/utils/errors.js';
import { validateCodeshotRequest } from '../../lib/utils/validation.js';

// Default configuration
const defaultConfig = {
    theme: 'dark',
    background: {
        style: 'solid',
        color: '#1a1a1a'
    },
    window: 'editor',
    font: {
        family: 'JetBrains Mono',
        size: 14
    },
    lineNumbers: true,
    output: {
        format: 'png',
        quality: 100,
        width: 800,
        height: 600
    },
    developer: {
        language: 'auto',
        showPath: false,
        tabSize: 4,
        wordWrap: false
    }
};

// Theme configurations
const themes = {
    light: {
        background: '#ffffff',
        foreground: '#000000',
        accent: '#007acc'
    },
    dark: {
        background: '#1a1a1a',
        foreground: '#ffffff',
        accent: '#007acc'
    },
    dracula: {
        background: '#282a36',
        foreground: '#f8f8f2',
        accent: '#bd93f9'
    },
    monokai: {
        background: '#272822',
        foreground: '#f8f8f2',
        accent: '#a6e22e'
    },
    solarized: {
        background: '#002b36',
        foreground: '#839496',
        accent: '#b58900'
    }
};

class CodeshotGenerator {
    constructor() {
        this.browser = null;
    }

    // Initialize browser
    async initialize() {
        if (!this.browser) {
            this.browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
        }
    }

    // Clean up browser
    async cleanup() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    // Generate HTML template
    generateTemplate(code, config) {
        const theme = themes[config.theme] || themes.dark;
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
                    
                    body {
                        margin: 0;
                        padding: ${config.padding || '20px'};
                        background: ${config.background.style === 'gradient' 
                            ? `linear-gradient(${config.background.color}, ${theme.background})`
                            : config.background.color};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }

                    .container {
                        background: ${theme.background};
                        border-radius: ${config.window === 'clean' ? '0' : '8px'};
                        box-shadow: ${config.window === 'clean' ? 'none' : '0 4px 24px rgba(0,0,0,0.2)'};
                        overflow: hidden;
                        width: fit-content;
                        max-width: 90vw;
                    }

                    .window-header {
                        display: ${config.window === 'clean' ? 'none' : 'flex'};
                        align-items: center;
                        padding: 8px 16px;
                        background: ${theme.background};
                        border-bottom: 1px solid ${theme.accent}30;
                    }

                    .window-controls {
                        display: flex;
                        gap: 6px;
                    }

                    .window-control {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: ${theme.accent}50;
                    }

                    .code-container {
                        padding: 20px;
                        overflow-x: auto;
                        position: relative;
                    }

                    pre {
                        margin: 0;
                        font-family: '${config.font.family}', 'JetBrains Mono', monospace;
                        font-size: ${config.font.size}px;
                        line-height: 1.5;
                        tab-size: ${config.developer.tabSize};
                        white-space: ${config.developer.wordWrap ? 'pre-wrap' : 'pre'};
                        counter-reset: line;
                    }

                    code {
                        color: ${theme.foreground};
                    }

                    ${config.lineNumbers ? `
                        .line {
                            display: inline-block;
                            width: 100%;
                            padding-left: 3.5em;
                            counter-increment: line;
                        }

                        .line::before {
                            content: counter(line);
                            position: absolute;
                            left: 0;
                            color: ${theme.accent}50;
                            text-align: right;
                            width: 3em;
                            padding-right: 0.5em;
                        }
                    ` : ''}

                    ${config.highlight ? `
                        .highlight {
                            background: ${theme.accent}20;
                            width: 100%;
                            display: inline-block;
                        }
                    ` : ''}
                </style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${config.theme === 'light' ? 'github' : 'github-dark'}.min.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
            </head>
            <body>
                <div class="container">
                    ${config.window !== 'clean' ? `
                        <div class="window-header">
                            <div class="window-controls">
                                <div class="window-control"></div>
                                <div class="window-control"></div>
                                <div class="window-control"></div>
                            </div>
                            ${config.developer.showPath ? `
                                <div class="file-path" style="margin-left: 20px; color: ${theme.foreground}50;">
                                    ${config.developer.path || 'example.code'}
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    <div class="code-container">
                        <pre><code class="language-${config.developer.language}">${this.processCode(code, config)}</code></pre>
                    </div>
                </div>
                <script>hljs.highlightAll();</script>
            </body>
            </html>
        `;
    }

    // Process code with line numbers and highlighting
    processCode(code, config) {
        const lines = code.split('\n');
        const processedLines = lines.map((line, index) => {
            const lineNumber = index + 1;
            const isHighlighted = config.highlight?.includes(lineNumber);
            const lineContent = line.replace(/[<>&]/g, char => ({
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;'
            }[char]));

            return `<span class="line${isHighlighted ? ' highlight' : ''}">${lineContent}</span>`;
        });

        return processedLines.join('\n');
    }

    // Generate screenshot
    async generateScreenshot(code, userConfig = {}) {
        try {
            const config = { ...defaultConfig, ...userConfig };
            
            await this.initialize();
            const page = await this.browser.newPage();
            
            // Set viewport
            await page.setViewport({
                width: config.output.width,
                height: config.output.height,
                deviceScaleFactor: 2
            });

            // Set content
            const html = this.generateTemplate(code, config);
            await page.setContent(html, { waitUntil: 'networkidle0' });

            // Take screenshot
            const element = await page.$('.container');
            const screenshot = await element.screenshot({
                type: config.output.format,
                quality: config.output.format === 'jpeg' ? config.output.quality : undefined,
                omitBackground: config.output.format === 'png'
            });

            return screenshot;
        } catch (error) {
            throw createError.internal('Screenshot generation failed', error);
        } finally {
            await this.cleanup();
        }
    }
}

// Create singleton instance
const codeshotGenerator = new CodeshotGenerator();

export const generateCodeshot = async (req, res) => {
    try {
        // Validate request
        await validateCodeshotRequest(req);

        const { code, ...config } = req.body;
        const screenshot = await codeshotGenerator.generateScreenshot(code, config);

        // Set response headers
        res.set('Content-Type', `image/${config.output?.format || 'png'}`);
        res.send(screenshot);
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw createError.validation(error.message);
        }
        throw error;
    }
};

export default generateCodeshot;
