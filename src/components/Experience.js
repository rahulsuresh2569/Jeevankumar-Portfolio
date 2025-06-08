import React from 'react';

const Experience = () => {
  // Placeholder data - replace with actual experience from LinkedIn/resume
  const experiences = [
    {
      id: 1,
      title: 'UI/UX Designer',
      company: 'Tech Solutions Inc.',
      years: 'Jan 2022 - Dec 2023',
      description: 'Designed and developed user interfaces for web and mobile applications, conducted user research, and created wireframes and prototypes.'
    },
    // Add more experiences here
  ];

  return (
    <section id="experience" className="min-h-screen bg-secondary text-primary py-20 px-10">
      <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
      <div className="max-w-4xl mx-auto">
        {experiences.map(exp => (
          <div key={exp.id} className="mb-8 p-6 border border-gray-700 rounded-lg">
            <h3 className="text-2xl font-semibold">{exp.title}</h3>
            <p className="text-xl text-gray-400">{exp.company} | {exp.years}</p>
            <p className="mt-2 text-gray-300">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience; 