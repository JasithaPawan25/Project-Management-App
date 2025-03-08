import { useCreateProjectMutation } from '@/state/api';
import React, { useState } from 'react'
import Modal from '@/app/(components)/Modal';
import { formatISO } from 'date-fns';

type Props = {
    isOpen:boolean;
    onClose:()=>void;
}

const ModalNewProject = ({isOpen,onClose}: Props) => {
    console.log("isopen",isOpen);
    
    const [createProject, {isLoading}] = useCreateProjectMutation();
   
    const projectState = ()=>{
        return {
            projectName:"",
            startDate:"",
            dueDate:"",
          //  status:"",
           // tags:"",
           // teamId:-1,
            description:""
        }
    }

    const [project, setProject] = useState(projectState);

    const handleSubmit = async () => {
        if(!project.projectName || !project.startDate || !project.dueDate) return;

        const formattedStateDate = formatISO(new Date(project.startDate),{representation:"complete"});
        const formattedSDueDate = formatISO(new Date(project.dueDate),{representation:"complete"})

        await createProject({
            name:project.projectName,
            description:project.description,
            startDate:formattedStateDate,
            endDate:formattedSDueDate,
        })
    }

    const isFormValid = () =>{
        return project.projectName && project.description && project.startDate && project.dueDate;
    };

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none focus:outline-blue-400"

  return <Modal isOpen={isOpen} onClose={onClose} name='Create New Project'>
    <form 
     className='mt-4 space-y-6'
     onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit();
     }}
    >
        <input type="text"
         className={inputStyles}
         placeholder='Project Name'
         value={project.projectName}
         onChange={(e)=> setProject({...project,projectName:e.target.value})}
        />
        <textarea
         className={inputStyles}
         placeholder='Project Description'
         value={project.description}
         onChange={(e)=> setProject({...project,description:e.target.value})}
        />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
            <input type="date"
            className={inputStyles}
           //placeholder='Project Start Date'
            value={project.startDate}
            onChange={(e)=> setProject({...project,startDate:e.target.value})}
            />
             <input type="date"
            className={inputStyles}
            //placeholder='Project End Date'
            value={project.dueDate}
            onChange={(e)=> setProject({...project,dueDate:e.target.value})}
            />
        </div>
        <button
         type='submit'
         className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${
            !isFormValid() || isLoading ? "cursonr-not-allowed opacity-50" : ""
         }`}
         disabled={!isFormValid() || isLoading}
        >
            {isLoading ? "Creating..." : "Create Project"}
        </button>
        
    </form>
  </Modal>
}

export default ModalNewProject