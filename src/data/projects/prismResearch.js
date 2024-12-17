import Project from '../../models/Project';

// Debug log before creating project
console.log('Creating Prism Research project...');

const prism = new Project({
  id: 'prism-research',
  title: 'PRISM: A Two-Dimensional Neural Architecture for Principled Reasoning with Integrated Structural Mapping',
  description: 'The PRISM framework represents a groundbreaking advancement in AI architecture, designed to move beyond traditional pattern-matching models. Unlike conventional large language models (LLMs) that operate as statistical predictors, PRISM introduces a unique blend of two-dimensional neural processing, knowledge graph integration, and a Checker Layer for logical validation. These components work together to create an AI system capable of principled reasoning, structured abstraction, and adaptive learning.',
  shortDescription: 'Research platform for Prism Research',
  technologies: ['Machine Learning', 'Artificial Intelligence', 'Neural Networks'],
  //githubUrl: 'https://github.com/frgmt0/prism-research.git',
  liveUrl: '/portfolio/research', // Added link to research page
  category: 'Research',
  featured: true,
  completionDate: '2024-12-17'
});

// Debug log after creating project
console.log('Prism Research project created:', {
  id: prism.id,
  title: prism.title,
  liveUrl: prism.liveUrl
});

export default prism;
