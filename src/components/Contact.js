import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen bg-primary text-secondary py-20 px-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
      <p className="text-lg text-center max-w-xl mb-8">
        I'm currently available for freelance work or full-time opportunities. If you have a project in mind or just want to say hi, feel free to reach out!
      </p>
      <a 
        href="mailto:youremail@example.com" // Replace with your actual email
        className="bg-secondary text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition duration-300 text-lg"
      >
        Email Me
      </a>
      {/* Add links to LinkedIn, Behance, etc. here later */}
    </section>
  );
};

export default Contact; 