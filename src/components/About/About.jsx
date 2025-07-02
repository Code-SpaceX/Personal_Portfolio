import { User2, Code2, Lightbulb } from 'lucide-react';
import { GoGraph } from 'react-icons/go';

// Section title component
function SectionTitle({ children }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
      {children}
    </h2>
  );
}

// Card component for About section
function AboutCard({ icon: Icon, title, description, color }) {
  return (
    <div className="relative group">
      {/* Blurred background behind card */}
      <div
        className={`absolute inset-0 ${color} rounded-xl blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`}
      />
      <div className="relative bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-4 space-x-4">
          <div className={`p-3 ${color} rounded-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}

// Main About component
export default function About() {
  const aboutSections = [
    {
      icon: User2,
      title: 'Who I Am',
      description:
        'A full-stack developer with an interest in software engineering. I enjoy solving problems and building scalable applications. Always learning new technologies to improve my skills.',
      color: 'bg-blue-600',
    },
    {
      icon: Code2,
      title: 'What I Do',
      description:
        'Develop high-performance web apps using modern tech stacks. Solve algorithmic problems and optimize code efficiency. Contribute to open-source and follow industry trends.',
      color: 'bg-purple-600',
    },
    {
      icon: GoGraph,
      title: 'My Goals',
      description:
        'Build tech products that solve real-world challenges at scale. Advance as a full-stack developer with modern frameworks. Grow the dev community through open-source contributions.',
      color: 'bg-green-600',
    },
    {
      icon: Lightbulb,
      title: 'My Philosophy',
      description:
        'Technology should simplify lives, not complicate them. Great software solves problems, not just writes code. Continuous learning keeps you ahead in tech.',
      color: 'bg-orange-600',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle>About Me</SectionTitle>

        {/* Description paragraph */}
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Hey there! 👋 I'm <span className="text-blue-600 font-semibold">Khushi Tyagi</span>,
            a Full-Stack Developer and a pre-final-year Computer Science Engineering student.
            I love transforming ideas into scalable web applications and solving complex coding challenges.
            My journey in tech revolves around continuous learning, experimenting with new technologies, and building solutions that make an impact.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="text-sm sm:text-base inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-lg shadow">
              🚀 I like to build products and solve problems
            </span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {aboutSections.map((section) => (
            <AboutCard
              key={section.title}
              icon={section.icon}
              title={section.title}
              description={section.description}
              color={section.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
