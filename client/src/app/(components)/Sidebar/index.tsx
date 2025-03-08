"use client";
import React,{useState} from 'react'
import Image from 'next/image';
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, ShieldAlert, User, Users, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import Link from 'next/link';
import { setIsSidebarCollapsed } from '@/state';
import { useGetProjectsQuery } from '@/state/api';


const Sidebar = () => {
    const [showProjects, setShowProjects] = useState(true);
    const [showPriority, setPriority] = useState(false);

   // const { data.extra, error, isLoading } = useGetProjectsQuery();
   const { data: projects } = useGetProjectsQuery();
   
    // if (isLoading) {
    //     return <p>Loading...</p>;
    // };

   // const projectlist = data?.extra || [];

    (projects);
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) =>state.global.isSidebarCollapsed
      );

    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all
     duration-300 h-full z-40 dark:bg-black  bg-white ${isSidebarCollapsed ? 'w-0 hidden' : 'w-64'}`;


  return (
    <div className={sidebarClassNames} >
        <div className='flex h-[100%] w-full flex-col justify-start'>
            <div className='z-5 flex min-h-[56px] w-64 items-center justify-between bg-white 
            px-6 pt-3 dark:bg-black'>
                {/* TOP LOGO */}
                <div className='text-xl font-bold text-gray-800 dark:text-white' >
                    EDLIST
                </div>

                {isSidebarCollapsed ? null : (
                    <button onClick={()=> dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                        <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
                    </button>
                )}

            </div>
            {/* TEAM */}
            <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
                <Image src="/icons/logo.png" alt="logo" width={40} height={40} />
                    <div>
                        <h3 className='text-md font-bold tracking-wide dark:text-gray-200'>ERDOH Team</h3>
                        <div className='mt-1 flex items-start gap-2'>
                            <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400' />
                            <p className='text-xs text-gray-500'>Private</p>
                        </div>
                    </div>
            </div>
                
            {/* Navbar links */}
            <nav className='z-10 w-full' >
                <SidebarLink href='/' icon={Home} label='Home' />
                <SidebarLink href='/timeline' icon={Briefcase} label='Timeline' />
                <SidebarLink href='/search' icon={Search} label='Search' />
                <SidebarLink href='/users' icon={User} label='Users' />
                <SidebarLink href='/teams' icon={Users} label='Teams' />
            </nav>

            {/* Projects */}
            <button onClick={()=> setShowProjects((prev)=> !prev)} 
            className='flex items-center gap-3 px-8 py-3 w-full justify-between text-gray-500'>
                <span className=''>Projects</span>
                {showProjects ? (
                    <ChevronUp className='h-5 w-5' />
                ): ( <ChevronDown className='h-5 w-5' />)}
            </button>

            {/* Project list */}
            <div className='overflow-hidden overflow-y-auto'>
                {showProjects && Array.isArray(projects?.extra) && projects.extra.length > 0
                && projects.extra.map((data)=> (
                    <SidebarLink key={data.id} icon={Briefcase} 
                    label={data.name} href={`/projects/${data.id}`} />
                ))}
            </div>

            {/* Priority links */}
            <button onClick={()=> setPriority((prev)=> !prev)} 
            className='flex items-center gap-3 px-8 py-3 w-full justify-between text-gray-500'>
                <span className=''>Priority</span>
                {showPriority ? (
                    <ChevronUp className='h-5 w-5' />
                ): ( <ChevronDown className='h-5 w-5' />)}
            </button>

            {/* Priority list */}
            {showPriority && (
                <>
                 <SidebarLink icon={AlertCircle} label="Urgent" href="/priority/urgent" />
                 <SidebarLink icon={ShieldAlert} label="High" href="/priority/high" />
                 <SidebarLink icon={AlertTriangle} label="Medium" href="/priority/medium" />
                 <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
                 <SidebarLink icon={Layers3 } label="Backlog" href="/priority/backlog" />
                </>
            )}

        </div>
    </div>
  )
};

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

const SidebarLink = ({
    href,
    icon:Icon,
    label,
}: SidebarLinkProps) =>{
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === '/' && href === '/dashboard');
   
    return (
        <Link href={href} className='w-full'>
           <div className={`relative flex cursor-pointer items-center gap-3 transition-colors
            hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
            } justify-start px-8 py-3`}>
                {isActive && (
                    <div className='absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200' />                   
                )}

            <Icon className='h-6 w-6 text-gray-800 dark:text-white' />
            <span className={`font-medium text-gray-800 dark:text-gray-100`}>
                {label}
            </span>
            </div>
        </Link>  
    )
}

export default Sidebar;
