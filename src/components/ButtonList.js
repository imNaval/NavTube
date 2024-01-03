import React, { useState } from 'react'
import Button from './Button'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const btnList = ["All", "Music", "Gaming", "Live", "Javascript", "React", "Interview", "Frontend", "Bharat", "Cricket", "News", "LoFi", "Musics", "Drama", "Cinema", "Watched"]

const ButtonList = () => {
  const length = btnList.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === length - 1 ? prevIndex : prevIndex + 1));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden px-12 relative">
        <div className="flex transition-transform ease-in-out duration-300" style={{ transform: `translateX(-${currentIndex * (100 / length)}%)` }} >
          {
            btnList.map((btn, idx) => <Button key={idx} name={btn} />)
          }
        </div>
      </div>
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md" onClick={prevSlide}>
        <FaChevronLeft className="text-gray-600" />
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md" onClick={nextSlide}>
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
  );

  // return (
  //   <div className='flex justify-center'>
  //   {
  //     btnList.map((btn, idx) => <Button key={idx} name={btn} />)
  //   }
  //   </div>
  // )
}

export default ButtonList