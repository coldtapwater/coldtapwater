import Project from '../../models/Project';

// Debug log before creating project
console.log('Creating Arx Discord Bot project...');

const arxDiscordBot = new Project({
  id: 'arx-discord-bot',
  title: 'Arx',
  description: 'A feature-rich economy bot for Discord with integrated games and comprehensive data management. This was my first major programming project, teaching me valuable lessons in data management, user interaction, and game development within a chat platform.',
  shortDescription: 'Economy-focused Discord bot with integrated games',
  technologies: ['Discord.py', 'Python', 'Database Management', 'Game Development'],
  githubUrl: 'https://github.com/coldtapwater/arx-rw.git',
  category: 'Bot Development',
  featured: true,
  completionDate: '2024-10-23'
});

// Debug log after creating project
console.log('Arx Discord Bot project created:', {
  id: arxDiscordBot.id,
  title: arxDiscordBot.title,
  githubUrl: arxDiscordBot.githubUrl
});

export default arxDiscordBot;
