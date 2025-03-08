"use client";

import { useSearchMutation } from '@/state/api';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react'
import Header from '../(components)/Header';
import TaskCard from '../(components)/TaskCard';
import ProjectCard from '../(components)/ProjectCard';
import UserCard from '../(components)/UserCard';


const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedProject, setIsExpandedProject] = useState(false);
    const [isExpandedUser, setIsExpandedUser] = useState(false);
    const [search, { data: searchResults, isLoading, isError }] = useSearchMutation();

    useEffect(() => {
        if (searchTerm.length >= 3) {
            search({ searchTxt: searchTerm }); // Call the mutation with an object payload
        }
    }, [searchTerm, search]);

    const handleSearch = debounce(
        (event: React.ChangeEvent<HTMLInputElement>)=>{
            setSearchTerm(event.target.value);
        },
        500,
    );

    useEffect(() => {
        if (searchTerm === "" || searchTerm.length >= 3) {
            search({ searchTxt: searchTerm }); // Call the mutation with an object payload
        }
    }, [searchTerm, search]);

    const seeMoreBtnClass = `flex items-center rounded dark:bg-gray-500 dark:hover:bg-gray-600 bg-blue-primary p-2 text-white hover:bg-blue-600 w-[93px] pl-[17px] px-4 h-[40px]`; 


  return (
    <div className='p-8'>
        <Header name='Search' />
        <div>
            <input
                type='text'
                placeholder='Search...'
                className='w-1/2 rounded border p-3 shadow'
                onChange={handleSearch}
            />
        </div>

        <div className='p-5'>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error occurred while fetching search results.</p>}
            {!isLoading && !isError && searchResults && (
                <div>
                    {searchResults.extra.tasks && searchResults.extra.tasks?.length > 0 && (
                        <Header name='Tasks' isSmallText />
                    )}
                     <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-col-3 lg:gap-6 pb-5'>
                        {searchResults.extra.tasks?.slice(0, isExpanded ? searchResults.extra.tasks.length : 4).map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                        
                        {/* Check if there are more than 4 tasks and show 'See More' button */}
                        {searchResults.extra.tasks && searchResults.extra.tasks?.length > 4 && !isExpanded && (
                            <button className={seeMoreBtnClass} onClick={() => setIsExpanded(true)}>See More</button>
                        )}

                        {/* Show 'See Less' button when all tasks are visible */}
                        {searchResults.extra.tasks && searchResults.extra.tasks?.length > 4 && isExpanded && (
                            <button className={seeMoreBtnClass} onClick={() => setIsExpanded(false)}>See Less</button>
                        )}
                     </div>

                    {searchResults.extra.projects && searchResults.extra.projects?.length > 0 && (
                        <Header name='Projects' isSmallText />
                    )}
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-col-3 lg:gap-6 pb-5'>
                        
                        {searchResults.extra.projects?.slice(0, isExpandedProject ? searchResults.extra.projects.length : 4).map((project) => (
                             <ProjectCard key={project.id} project={project} />
                        ))}
                        
                        {/* Check if there are more than 4 tasks and show 'See More' button */}
                        {searchResults.extra.projects && searchResults.extra.projects?.length > 4 && !isExpandedProject && (
                            <button className={seeMoreBtnClass} onClick={() => setIsExpandedProject(true)}>See More</button>
                        )}

                        {/* Show 'See Less' button when all tasks are visible */}
                        {searchResults.extra.projects && searchResults.extra.projects?.length > 4 && isExpandedProject && (
                            <button className={seeMoreBtnClass} onClick={() => setIsExpandedProject(false)}>See Less</button>
                        )}
                    </div>


                    {searchResults.extra.users && searchResults.extra.users?.length > 0 && (
                         <Header name='Users' isSmallText />
                    )}
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-col-3 lg:gap-6 pb-5'>

                        {searchResults.extra.users?.slice(0, isExpandedUser ? searchResults.extra.users.length : 4).map((user) => (
                              <UserCard key={user.userid} user={user} />
                        ))}
                        
                        {/* Check if there are more than 4 tasks and show 'See More' button */}
                        {searchResults.extra.users && searchResults.extra.users?.length > 4 && !isExpandedUser && (
                            <button className={seeMoreBtnClass} onClick={() => setIsExpandedUser(true)}>See More</button>
                        )}

                        {/* Show 'See Less' button when all tasks are visible */}
                        {searchResults.extra.users && searchResults.extra.users?.length > 4 && isExpandedUser && (
                            <button className={seeMoreBtnClass} onClick={() => setIsExpandedUser(false)}>See Less</button>
                        )}
                    </div>

                </div>
            )}
        </div>

    </div>
  )
}

export default Search