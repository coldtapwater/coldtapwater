import Project from '../../models/Project';

// Debug log before creating project
console.log('Creating Loan Calculator project...');

const loanCalculator = new Project({
  id: 'loan-calculator',
  title: 'Loan Calculator',
  description: 'A simple loan calculator built with Rust. This was my first major programming project in Rust, teaching me valuable lessons in user interaction and data management.',
  shortDescription: 'Simple loan calculator built with Rust',
  technologies: ['Rust'],
  githubUrl: 'https://github.com/frgmt0/loans.git',
  category: 'Coding',
  featured: true,
  completionDate: '2024-12-17'
});

// Debug log after creating project
console.log('Loan Calculator project created:', {
  id: loanCalculator.id,
  title: loanCalculator.title,
  githubUrl: loanCalculator.githubUrl
});

export default loanCalculator;
