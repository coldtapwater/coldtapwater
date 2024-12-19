import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFont } from '../../context/FontContext';
import allBlogPosts from '../../data/blogposts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
  </svg>
);

const BlogPost = () => {
  const { id } = useParams();
  const { fontStyle } = useFont();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // Use the same font as headers based on fontStyle
  const headerFont = fontStyle === 'EasyRead' ? 'TrashHand' : 'aaaiight';

  useEffect(() => {
    const foundPost = allBlogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost.getFullData());
    }
  }, [id]);

  // Custom syntax highlighting theme
  const customTheme = {
    ...atomDark,
    'pre[class*="language-"]': {
      ...atomDark['pre[class*="language-"]'],
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1.5rem',
      marginTop: '1rem',
    },
    'code[class*="language-"]': {
      ...atomDark['code[class*="language-"]'],
      background: 'transparent',
      textShadow: 'none',
    },
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background-color pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 
            className="font-street text-4xl mb-4 tracking-wider text-gradient"
            style={{ fontFamily: headerFont }}
          >
            Post Not Found
          </h1>
          <Link 
            to="/blog"
            className="text-primary-color hover:text-accent-color transition-colors"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-color pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Link 
            to="/blog"
            className="inline-flex items-center text-primary-color hover:text-accent-color transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>

          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary-color">{post.category}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{post.readTime}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{post.formattedPublishDate}</span>
            </div>
            <h1 
              className="font-street text-4xl md:text-5xl mb-6 tracking-wider text-gradient"
              style={{ fontFamily: headerFont }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary-color/20 text-primary-color text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Section */}
            <div className="flex items-center gap-4 mb-8 bg-black/30 p-4 rounded-lg">
              {post.author.avatar && (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-white">{post.author.name}</h3>
                {post.author.bio && (
                  <p className="text-gray-400 text-sm mt-1">{post.author.bio}</p>
                )}
                {post.author.social && (
                  <div className="flex gap-3 mt-2">
                    {post.author.social.github && (
                      <a 
                        href={post.author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-color transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {post.author.social.bluesky && (
                      <a 
                        href={post.author.social.bluesky}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-color transition-colors"
                      >
                        Bluesky
                      </a>
                    )}
                    {post.author.social.linkedin && (
                      <a 
                        href={post.author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-color transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative aspect-video mb-12 rounded-xl overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 
                    style={{ fontFamily: headerFont }} 
                    className="font-street text-3xl md:text-4xl mb-6 tracking-wide text-gradient"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2 
                    style={{ fontFamily: headerFont }}
                    className="font-street text-2xl md:text-3xl mb-4 tracking-wide"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3 
                    style={{ fontFamily: headerFont }}
                    className="font-street text-xl md:text-2xl mb-3 tracking-wide"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p 
                    className="mb-4 text-gray-300 leading-relaxed"
                    {...props}
                  />
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  
                  return !inline ? (
                    <SyntaxHighlighter
                      style={customTheme}
                      language={language}
                      PreTag="div"
                      showLineNumbers={true}
                      wrapLines={true}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code 
                      className="bg-black/50 px-1.5 py-0.5 rounded text-primary-color font-mono text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre className="bg-transparent" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside mb-4 text-gray-300" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside mb-4 text-gray-300" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-2" {...props} />
                ),
                a: ({ node, href, children, ...props }) => {
                  const isInternal = href?.startsWith('/');
                  const isResearchPaper = href?.includes('/portfolio/research');
                  
                  if (isResearchPaper) {
                    return (
                      <span
                        onClick={() => navigate(href)}
                        className="inline-flex items-center gap-2 text-xl font-borela tracking-wide cursor-pointer transition-all duration-300 hover:-translate-y-0.5 group"
                        {...props}
                      >
                        <span className="text-white group-hover:text-gradient">{children}</span>
                        <DocumentIcon className="text-primary-color" />
                      </span>
                    );
                  }
                  
                  if (isInternal) {
                    return (
                      <span
                        onClick={() => navigate(href)}
                        className="text-primary-color hover:text-accent-color transition-colors cursor-pointer"
                        {...props}
                      >
                        {children}
                      </span>
                    );
                  }
                  return (
                    <a 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-color hover:text-accent-color transition-colors"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Last Modified Date */}
          {post.formattedLastModified && (
            <div className="mt-12 text-sm text-gray-400">
              Last updated: {post.formattedLastModified}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
