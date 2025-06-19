import React from 'react';

// Import design gallery images
import iPhone1 from '../assets/images/design-gallery/iPhone 14 Plus_1.png';
import iPhone2 from '../assets/images/design-gallery/iPhone 14 Plus_2.png';
import iPhone3 from '../assets/images/design-gallery/iPhone 14 Plus_3.png';
import iPad1 from '../assets/images/design-gallery/iPad_1.png';
import laptop from '../assets/images/design-gallery/Laptop.png';
import surfacePro from '../assets/images/design-gallery/Surface Pro.png';
import tablet from '../assets/images/design-gallery/Tablet.png';
import watch1 from '../assets/images/design-gallery/Watch_1.png';
import watch2 from '../assets/images/design-gallery/Watch_2.png';

const DesignGallery = () => {

  // Gallery data with absolute positioning matching expected layout
  const galleryItems = [
    {
      id: 1,
      src: iPad1, // Top left - AI explore tablet (background)
      alt: 'iPad Design',
      position: 'left-4 lg:left-8',
      spacing: 'top-4 lg:top-8',
      zIndex: 1
    },
    {
      id: 2,
      src: laptop, // Top center - dashboard laptop
      alt: 'Laptop Design',
      position: 'left-1/2 transform -translate-x-1/2',
      spacing: 'top-8 lg:top-12',
      zIndex: 3
    },
    {
      id: 3,
      src: watch1, // Top right - first watch
      alt: 'Watch Design 1',
      position: 'right-40 lg:right-60',
      spacing: 'top-4 lg:top-8',
      zIndex: 4
    },
    {
      id: 4,
      src: iPhone3, // Top right - analytics phone
      alt: 'iPhone Design 3',
      position: 'right-4 lg:right-8',
      spacing: 'top-16 lg:top-[9rem]',
      zIndex: 5
    },
    {
      id: 5,
      src: iPhone1, // Overlapping iPad - white phone with cards
      alt: 'iPhone Design 1',
      position: 'left-16 lg:left-32',
      spacing: 'top-32 lg:top-[21rem]',
      zIndex: 6
    },
    {
      id: 6,
      src: watch2, // Bottom left - second watch
      alt: 'Watch Design 2',
      position: 'left-2 lg:left-20',
      spacing: 'top-80 lg:top-[47rem]',
      zIndex: 7
    },
    {
      id: 7,
      src: iPhone2, // Bottom center-left - purple/blue phone
      alt: 'iPhone Design 2',
      position: 'left-16 lg:left-80',
      spacing: 'top-96 lg:top-[38rem]',
      zIndex: 8
    },
    {
      id: 8,
      src: tablet, // Bottom center-right - AINO tablet
      alt: 'Tablet Design',
      position: 'right-96 lg:right-[30rem]',
      spacing: 'top-88 lg:top-[32rem]',
      zIndex: 4
    },
    {
      id: 9,
      src: surfacePro, // Bottom far right - dark analytics surface (off viewport)
      alt: 'Surface Pro Design',
      position: 'right-0 transform translate-x-1/2 lg:translate-x-1/4',
      spacing: 'top-88 lg:top-[39rem]',
      zIndex: 9
    }
  ];



  return (
    <section 
      id="design-gallery" 
      className="relative bg-secondary overflow-hidden"
      style={{ minHeight: '150vh' }}
    >
      {/* Gallery Container - No padding, starts immediately */}
      <div className="relative w-full">
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute ${item.position} ${item.spacing}`}
            style={{ zIndex: item.zIndex || (10 - index) }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-auto h-auto object-cover"
              style={{
                maxWidth: item.src.includes('Watch') ? '300px' : 
                         item.src.includes('iPhone') ? '300px' :
                         item.src.includes('iPad') ? '500px' :
                         item.src.includes('Tablet') ? '700px' :
                         item.src.includes('Laptop') ? '2000px' :
                         '800px'
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DesignGallery; 