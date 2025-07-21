import React, { useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const btnList = ["All", "Music", "Gaming", "Live", "Javascript", "React", "Interview", "Frontend", "Bharat", "Cricket", "News", "LoFi", "Musics", "Drama", "Cinema", "Watched"]

const ButtonList = () => {
  const length = btnList.length;
  const [currentIndex] = useState(0);
  const isDark = useSelector(store=> store.app.isDark)

  return (
    <div className={`sticky top-[100px] z-50 ${isDark ? 'bg-gray-900' : 'bg-white'} px-4 py-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="overflow-x-scroll no-scrollbar relative">
        <div className="flex transition-transform ease-in-out duration-300" style={{ transform: `translateX(-${currentIndex * (100 / length)}%)` }} >
          {
            btnList.map((btn) => <Link key={btn} to={"/search/" + btn}> <Button name={btn} /> </Link>)
          }
        </div>
      </div>
    </div>
  );
}

export default ButtonList