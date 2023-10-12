import { Carousel } from '@material-tailwind/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const Slides: Component<{ slides: SlideData[] }> = ({ slides }) => {
  return (
    <Carousel
      className='rounded-lg'
      prevArrow={({ handlePrev }) => (
        <div className='absolute top-[40%] left-[5%] p-[5px] rounded-full bg-white opacity-40 cursor-pointer hover:opacity-100'>
          <ChevronLeftIcon strokeWidth={4} className='w-5 h-5' onClick={handlePrev} />
        </div>
      )}
      nextArrow={({ handleNext }) => (
        <div className='absolute top-[40%] right-[5%] p-[5px] rounded-full bg-white opacity-40 cursor-pointer hover:opacity-100'>
          <ChevronRightIcon strokeWidth={4} className='w-5 h-5' onClick={handleNext} />
        </div>
      )}
      loop={true}
      autoplay={true}
      autoplayDelay={3000}
    >
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.src}
          alt={slide.alt}
          className='h-[200px] object-cover w-full lg:h-[400px]'
        />
      ))}
    </Carousel>
  );
};
