import { motion } from 'framer-motion';

const SkillTag = ({ name }) => (
  <span className="px-4 py-2 bg-primary-color/20 rounded-full font-street text-lg tracking-wider">
    {name}
  </span>
);

const Section = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="font-tag text-4xl md:text-5xl mb-6 tracking-wider text-gradient homecard-container">
      {title}
    </h2>
    <div className="space-y-4 font-street text-xl text-gray-300 tracking-wide leading-relaxed">
      {children}
    </div>
  </div>
);

const About = () => {
  const skills = [
    'Python', 'JavaScript', 'React', 'Node.js', 'Database Design',
    'Machine Learning', 'Problem Solving', 'Creative Coding'
  ];

  return (
    <div className="min-h-screen bg-background-color pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Bio Section */}
          <Section title="About Me">
            <p>
            Hey there! I’m Jason and I build everything from Discord bots to experimental AI projects, sprinkling creativity and a bit of stubborn determination into every line of code.

            When I’m not coding, you’ll probably find me experimenting with digital art, tinkering with random gadgets, or trying (and sometimes failing) to explain my latest wild idea to friends.
            </p>
          </Section>

          {/* Career Journey */}
          <Section title="My Journey">
            <p>
              What started as a curiosity about how games work turned into a deep dive into the
              world of programming. I began with Python, creating my first major project - a Discord
              bot named Arx that taught me valuable lessons about data management and user interaction.
            </p>
            <p>
              Since then, I've expanded my skills into web development, exploring technologies like
              React and Node.js to build more complex and interactive applications.
            </p>
          </Section>

          {/* Skills Section */}
          <Section title="Skills & Tools">
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SkillTag name={skill} />
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            <p>
              Currently in my second year of a Bachelors in Electrical Engineering at{" "}
              <span className="text-gradient">Mount San Antonio College</span>. Graduated from the <span className="text-gradient">eSTEM Academy</span> in 2023 with a focus on Computer Science and Robotics.
            </p>
          </Section>

          {/* Fun Facts */}
          <Section title="Fun Facts">
            <ul className="list-disc list-inside space-y-2">
              <li>I once built a program that could calculate the volume of rotated shapes. Nerdy? Yes. Cool? Also yes.</li>
              <li>Love exploring new technologies and creative coding techniques</li>
              <li>Enjoy turning complex problems into elegant solutions</li>
            </ul>
          </Section>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
