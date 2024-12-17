import Project from '../../models/Project';

// Debug log before creating project
console.log('Creating SoFragment project...');

const soFragment = new Project({
  id: 'so-fragment',
  title: 'SoFragment AI Solutions',
  description: 'Currently composed of two main projects: Solta & Soren. Solta is a framework to build agentic solutions for any project. Soren is a foundational model built from scratch. Both are open source and can be used for any project.',
  shortDescription: 'Open Source AI Framework and Model',
  technologies: ['Python', 'Machine Learning', 'Artificial Intelligence'],
  githubUrl: 'https://github.com/sofragment',
  category: 'Machine Learning',
  featured: false,
  completionDate: '2024-11-16'
});

// Debug log after creating project
console.log('SoFragment project created:', {
  id: soFragment.id,
  title: soFragment.title,
  githubUrl: soFragment.githubUrl
});

export default soFragment;
