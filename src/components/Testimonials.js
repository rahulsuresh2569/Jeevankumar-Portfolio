import React from 'react';

const Testimonials = () => {
  // Placeholder data
  const testimonials = [
    {
      id: 1,
      quote: 'Jeevan is a highly talented UI/UX designer. His attention to detail and creative solutions were invaluable to our project.',
      name: 'Satisfied Client',
      company: 'Client Company Inc.'
    },
    // Add more testimonials
  ];

  return (
    <section id="testimonials" className="min-h-screen bg-secondary text-primary py-20 px-10">
      <h2 className="text-4xl font-bold text-center mb-12">What Others Say</h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {testimonials.map(testimonial => (
          <blockquote key={testimonial.id} className="p-6 border border-gray-300 rounded-lg shadow-lg">
            <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
            <footer className="text-right">
              <p className="font-semibold">- {testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.company}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
};

export default Testimonials; 