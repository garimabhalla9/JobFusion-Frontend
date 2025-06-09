import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science Engineer",
    "Graphic Designer",
    "Full Stack Developer",
    "Cloud Engineer",
];

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])

    const handleCategoryClick = (category) => {
        dispatch(setSearchedQuery(category));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="sticky top-0 z-50 bg-white border-b">
                <Navbar />
            </div>
            <div className='flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10'>
                <h1 className='font-bold text-xl mb-6'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {allJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Browse