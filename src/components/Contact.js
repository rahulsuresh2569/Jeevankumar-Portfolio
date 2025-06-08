import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen bg-secondary text-primary py-20 px-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-8">Get In Touch</h2>
      <p className="text-center text-xl mb-10 max-w-2xl">
        I'm currently open to new opportunities. If you have a project in mind or just want to say hi, feel free to reach out.
      </p>
      <a 
        href="mailto:jeevan.kumar@example.com" 
        className="bg-primary text-secondary font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition duration-300 text-lg"
      >
        Email Me
      </a>
      {/* Add links to LinkedIn, Behance, etc. here later */}
    </section>
  );
};

export default Contact; 