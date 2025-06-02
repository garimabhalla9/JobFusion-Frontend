import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from "react-typed";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                
                {/* <h1 className='text-4xl sm:text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1> */}
                <ReactTyped
          className="text-5xl font-bold"
          strings={[
            "Search, Apply & Get Your Dream Jobs",
            "Find the Right Job, Right Now",
            "Your Gateway to Career Success",
            "Connecting Talent with Opportunity"
          ]}
          typeSpeed={40}
          backSpeed={50}
          loop={true}
        />
                <p>Empowering job seekers and employers with smart, reliable hiring solutions.</p>
                <div className='flex flex-col sm:flex-row w-full sm:w-[80%] lg:w-[60%] shadow-lg border border-gray-200 rounded-full items-center mx-auto overflow-hidden'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-6 py-4 text-base'
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="w-full sm:w-auto px-8 rounded-none sm:rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6]"
                    >
                        <Search className='h-5 w-5 sm:mr-2' />
                        <span className="hidden sm:inline">Search</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection