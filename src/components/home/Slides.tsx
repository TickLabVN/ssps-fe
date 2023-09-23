import { useState } from 'react';
import { FC } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Slide {
  src: string;
  alt: string;
}
interface SlidesProps {
  children: Slide[];
}
export const Slides: FC<SlidesProps> = ({ children }) => {
  const [slide, setSlide] = useState(0);
  const slideLength = children.length;
  const handleleftArrow = () => {
    const previousSlide = slide === 0 ? slideLength - 1 : slide - 1;
    setSlide(previousSlide);
  };
  const handleRightArrow = () => {
    const nextSlide = slide === slideLength - 1 ? 0 : slide + 1;
    setSlide(nextSlide);
  };
  setTimeout(handleRightArrow, 3000);
  return (
    <div className='relative mb-4 w-full lg:mb-12'>
      <div className='absolute top-[40%] left-[5%] p-[5px] rounded-[999px] bg-white opacity-40 cursor-pointer hover:opacity-100'>
        <ArrowLeftIcon className='w-4' onClick={handleleftArrow} />
      </div>
      {children.map((child, index) => {
        return (
          <img
            src={child.src}
            alt={child.alt}
            key={index}
            className={
              slide === index ? 'rounded-lg h-[200px] object-cover w-full lg:h-[400px]' : 'hidden'
            }
          />
        );
      })}
      <div className='absolute top-[40%] right-[5%] p-[5px] rounded-[999px] bg-white opacity-40 cursor-pointer hover:opacity-100'>
        <ArrowRightIcon className='w-4 ' onClick={handleRightArrow} />
      </div>
      <span className='flex absolute bottom-[1rem] left-[40%] lg:left-[50%]'>
        {children.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={
                slide === idx
                  ? 'bg-white h-[0.5rem] w-[0.5rem] rounded-full border-0 outline-0 my-0 mx-[0.2rem] cursor-pointer'
                  : 'h-[0.5rem] w-[0.5rem] rounded-full border-0 outline-0 my-0 mx-[0.2rem] cursor-pointer bg-[#9CA3AF]'
              }
            ></button>
          );
        })}
      </span>
    </div>
  );
};
