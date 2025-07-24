import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { toggleMenu } from '../utils/appSlice';

const Sidebar = () => {
  const { isDark, isMenuOpen } = useSelector(store => store.app)
  const dispatch = useDispatch();
  const location = useLocation();

  const sidebarItems = [
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
      ), 
      label: "Home", 
      path: "/",
      showInClosed: true
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
        </svg>
      ), 
      label: "Shorts", 
      path: "/shorts",
      showInClosed: true
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ), 
      label: "Subscriptions", 
      path: null,
      showInClosed: true
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
        </svg>
      ), 
      label: "Library", 
      path: null,
      showInClosed: true
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
        </svg>
      ), 
      label: "History", 
      path: null,
      showInClosed: false
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
        </svg>
      ), 
      label: "Your Videos", 
      path: null,
      showInClosed: false
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
        </svg>
      ), 
      label: "Watch Later", 
      path: null,
      showInClosed: false
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
        </svg>
      ), 
      label: "Music", 
      path: null,
      showInClosed: false
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415zM9 12a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
        </svg>
      ), 
      label: "Sports", 
      path: null,
      showInClosed: false
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>
      ), 
      label: "Gaming", 
      path: null,
      showInClosed: false
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
        </svg>
      ), 
      label: "Movies", 
      path: null,
      showInClosed: false
    },
  ];

  const renderSidebarItem = (item, index) => {
    // Only show items that should be visible in closed state
    if (!isMenuOpen && !item.showInClosed) {
      return null;
    }

    const isActive = location.pathname === item.path;
    const baseClasses = `flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
      isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
    } ${isActive ? (isDark ? 'bg-gray-800' : 'bg-gray-200') : ''}`;

    const content = (
      <>
        <span className="mr-3">{item.icon}</span>
        <span className={`transition-all duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
          {item.label}
        </span>
      </>
    );

    if (item.path) {
      return (
        <Link key={index} to={item.path} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <div key={index} className={baseClasses}>
        {content}
      </div>
    );
  };

  return (
    <div 
      className={`fixed left-0 top-20 h-[calc(100vh-5rem)] z-40 transition-all duration-300 ease-in-out border-r ${
        isDark ? 'bg-gray-900 text-white border-r-gray-700' : 'bg-white text-gray-800 border-gray-200'
      } ${isMenuOpen ? 'w-60' : 'w-20'}`}
    >
      <div className={`p-4 h-full overflow-y-auto mt-4 overflow-x-hidden`}>

        {/* Sidebar Items */}
        <div className="space-y-1">
          {sidebarItems.map((item, index) => renderSidebarItem(item, index))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar