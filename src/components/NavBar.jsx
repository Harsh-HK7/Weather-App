import React from 'react';
import logo from '../assets/logo.png';
import search from '../assets/search.png';
import location from '../assets/current-location.png';
import { useState } from 'react';
import { toast } from 'react-toastify';

   

const NavBar = ({onCitySearch, onLocationFetch}) => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery){
      onCitySearch(searchQuery);
      setSearchQuery(''); // Clear search query after submission
    }
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) =>{
        const { latitude, longitude } = pos.coords;
        onLocationFetch(latitude, longitude);
        setSearchQuery(''); // Clear search query when using current location
      }, (error) =>{
        console.log(error)
        toast.error("Geolocation is not supported by your browser")
      })
    }
  }

  return (
    <div className="m-4">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        {/*logo */}
        <img src={logo} alt="logo" className='w-48 select-none' />

        <form onSubmit={handleSearchSubmit} className='relative flex items-center w-full max-w-md bg-white rounded-lg shadow-md'>
            <img src={search} alt="search" className='absolute left-2 w-6 h-6 text-gray-400 select-none' />
            <input
             type="text" 
             value={searchQuery}
             placeholder='Search for your preferred city...'
             className='w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 border-none rounded-lg outline-none'
             onChange={handleSearchQuery}
             />

            <button type='submit' className='bg-[#050e1fde] text-white p-5 py-2'>
              Search
              </button> 
        </form>
        <div onClick={handleLocationClick} className='flex items-center gap-3 px-4 text-sm font-medium text-white bg-green-500 rounded cursor-pointer'>
          <img src={location} alt="location"  className='w-8'/>
          <p>Current Location</p>
        </div>
      </div>
    </div>
  )
};
export default NavBar
