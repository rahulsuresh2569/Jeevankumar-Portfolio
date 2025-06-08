import React from 'react';

const Education = () => {
  // Placeholder data - replace with actual education details
  const educationHistory = [
    {
      id: 1,
      degree: 'Bachelor of Design (B.Des) in UI/UX',
      institution: 'Design University',
      years: '2018 - 2022',
      description: 'Focused on user interface design, user experience research, interaction design, and usability testing.'
    },
    // Add more education or certifications
  ];

  return (
    <section id="education" className="min-h-screen bg-secondary text-primary py-20 px-10">
      <h2 className="text-4xl font-bold text-center mb-12">Education</h2>
      <div className="max-w-4xl mx-auto">
        {educationHistory.map(edu => (
          <div key={edu.id} className="mb-8 p-6 border border-gray-700 rounded-lg">
            <h3 className="text-2xl font-semibold">{edu.degree}</h3>
            <p className="text-xl text-gray-400">{edu.institution} | {edu.years}</p>
            <p className="mt-2 text-gray-300">{edu.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education; 