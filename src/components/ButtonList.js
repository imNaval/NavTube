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
    <div className={`relative ${isDark && 'bg-gray-900'} px-4`}>
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