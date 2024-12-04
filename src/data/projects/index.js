import arxDiscordBot from './arxDiscordBot';
import soFragment from './soFragment';

// Export all projects in an array, sorted by date (newest first)
const allProjects = [
  arxDiscordBot,
  soFragment,
  // Add more projects here
].sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));

export default allProjects;
