import arxDiscordBot from './arxDiscordBot';
import soFragment from './soFragment';
import prism from './prismResearch';
import loanCalculator from './loanCalculator';
// Export all projects in an array, sorted by date (newest first)
const allProjects = [
  arxDiscordBot,
  soFragment,
  prism,
  loanCalculator
  // Add more projects here
].sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));

export default allProjects;
