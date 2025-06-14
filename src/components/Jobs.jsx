import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                // Check for location filter
                if (["Gurgaon", "Bangalore", "Hyderabad", "Pune", "Mumbai"].includes(searchedQuery)) {
                    return job.location.toLowerCase() === searchedQuery.toLowerCase();
                }
                
                // Check for industry/role filter
                if (["Frontend Developer", "Backend Developer", "Data Science Engineer", 
                     "Graphic Designer", "Full Stack Developer", "Cloud Engineer"].includes(searchedQuery)) {
                    return job.title.toLowerCase().includes(searchedQuery.toLowerCase());
                }
                
                // Check for salary range filter
                if (searchedQuery.includes("lakh")) {
                    const [min, max] = searchedQuery.split("-")
                        .map(s => parseInt(s.replace("lakh", "")));
                    return job.salary >= min && job.salary <= max;
                }

                // Default search in title and description
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-1/4'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs