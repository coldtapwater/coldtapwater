import { motion } from 'framer-motion';
import allProjects from '../../data/projects';

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12" />
  </svg>
);

const ProjectCard = ({ project, isFeatured }) => {
  return (
    <div className={`${isFeatured ? 'col-span-1 md:col-span-2 lg:col-span-2' : ''}`}>
      <div className="bg-black/30 rounded-xl p-8 h-full transform transition-all duration-300 hover:scale-[1.02] hover:bg-black/40 hover:shadow-xl hover:shadow-primary-color/20">
        <h2 className="font-tag text-4xl md:text-5xl mb-6 tracking-wider text-gradient">
          {project.title}
        </h2>
        <div className="space-y-6">
          <p className="font-street text-xl text-gray-300 tracking-wide leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-color/20 rounded-full font-street text-sm tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.githubUrl && (
            <div className="mt-6">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-primary-color/10 hover:bg-primary-color/20 border-2 border-primary-color/30 hover:border-primary-color rounded-lg text-white hover:text-primary-color font-street text-xl transition-all duration-300 hover:-translate-y-1 github-link"
              >
                <span>View on GitHub</span>
                <GitHubIcon />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="min-h-screen bg-background-color pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isFeatured={index === 0}
            />
          ))}

          {allProjects.length < 3 && (
            <>
              <div className="opacity-30 bg-black/30 rounded-xl p-8 flex items-center justify-center">
                <p className="font-street text-xl text-gray-300 tracking-wide">
                  More projects coming soon...
                </p>
              </div>
              <div className="opacity-30 bg-black/30 rounded-xl p-8 flex items-center justify-center">
                <p className="font-street text-xl text-gray-300 tracking-wide">
                  More projects coming soon...
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
