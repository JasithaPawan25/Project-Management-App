import { Priority, Status, useCreateProjectMutation, useCreateTaskMutation } from '@/state/api';
import React, { useState } from 'react'
import Modal from '@/app/(components)/Modal';
import { formatISO } from 'date-fns';

type Props = {
    isOpen:boolean;
    projectId?:number | undefined;
    onClose:()=>void;
}

const ModalNewTask = ({isOpen,onClose,projectId = undefined}: Props) => {
    
    const [createTask, {isLoading}] = useCreateTaskMutation();
   
    const taskState = ()=>{
        return {
            title:"",
            description:"",
            status:Status.Todo, // or any valid Status value
            tags:"",
            priority:Priority.Medium,
            startDate:"",
            dueDate:"",
            authorUserId:"",
            assignedUserId:"",
            projectId:projectId ? projectId.toString() : ""
        }
    }

    const [task, setTask] = useState(taskState);

    const handleSubmit = async () => {
        if((!task.title) || !(projectId !== undefined || projectId)) return;

        const formattedStateDate = formatISO(new Date(task.startDate),{representation:"complete"});
        const formattedSDueDate = formatISO(new Date(task.dueDate),{representation:"complete"})

        await createTask({
            title:task.title,
            status:task.status,
            priority:task.priority,
            tags:task.tags,
            authorId:parseInt(task.authorUserId),
            assigneeId :parseInt(task.assignedUserId),
            description:task.description,
            startDate:formattedStateDate,
            dueDate:formattedSDueDate,
            projectId: task.projectId !== undefined ? parseInt(task.projectId) : -1
        })
    } 

    const isFormValid = () =>{
        return task.title && task.assignedUserId 
        && task.authorUserId && task.description 
        && task.startDate && task.dueDate
        && !(task.projectId !== undefined || task.projectId);
    };


    const statusArray = [
        {value:"Open",label:"Open"},
        {value:"InProgress",label:"In Progress"},
        {value:"WorkInProgress" , label:"Work In Progress"},
        {value:"Done" , label:"Done"},
        {value:"Ongoing" , label:"Ongoing"},
        {value:"Completed" , label:"Completed"},
        {value:"Cancelled" , label:"Cancelled"},
        {value:"Todo" , label:"To Do"},
        {value:"InReview" , label:"In Review"},
        {value:"Blocked" , label:"Blocked"},
        {value:"Waiting" , label:"Waiting"},
        {value:"UnderReview" , label:"Under Review"},
        {value:"Approved" , label:"Approved"},
        {value:"Rejected" , label:"Rejected"},
    ]

    const priorityArray = [
            {value:"Low" , label:"Low"},
            {value:"Medium" , label:"Medium"},
            {value:"High" , label:"High"},
            {value:"Urgent" , label:"Urgent"},
            {value:"Critical" , label:"Critical"},
            {value:"Backlog" , label:"Backlog"},
            {value:"Normal" , label:"Normal"},
    ];

    console.log("task.projectId",task);
    

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none focus:outline-blue-400"

  return <Modal isOpen={isOpen} onClose={onClose} name='Create New Task'>
    <form 
     className='mt-4 space-y-6'
     onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit();
     }}
    >
        <input type="text"
         className={inputStyles}
         placeholder='Task Title'
         value={task.title}
         onChange={(e)=> setTask({...task,title:e.target.value})}
        />
        <textarea
         className={inputStyles}
         placeholder='Task Description'
         value={task.description}
         onChange={(e)=> setTask({...task,description:e.target.value})}
        />

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
                <select  className={inputStyles} >
                    <option disabled>Select Status</option>
                    {statusArray.map((status,index)=>(
                        <option key={index} value={status.value}>{status.label}</option>
                    ))}      
                </select>

                <select  className={inputStyles} >
                    <option disabled>Select Priority</option>
                    {priorityArray.map((priority,index)=>(
                        <option key={index} value={priority.value}>{priority.label}</option>
                    ))}      
                </select>
        </div>

        

        <input type="text"
         className={inputStyles}
         placeholder='Add Tags'
         value={task.tags}
         onChange={(e)=> setTask({...task,tags:e.target.value})}
        />

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
            <input type="date"
            className={inputStyles}
            //placeholder='Project Start Date'
            value={task.startDate}
            onChange={(e)=> setTask({...task,startDate:e.target.value})}
            />
             <input type="date"
            className={inputStyles}
            //placeholder='Project End Date'
            value={task.dueDate}
            onChange={(e)=> setTask({...task,dueDate:e.target.value})}
            />
        </div>

        <input type="text"
         className={inputStyles}
         placeholder='Add Author User Id'
         value={task.authorUserId}
         onChange={(e)=> setTask({...task,authorUserId:e.target.value})}
        />

        <input type="text"
         className={inputStyles}
         placeholder='Add Assigned User Id'
         value={task.assignedUserId}
         onChange={(e)=> setTask({...task,assignedUserId:e.target.value})}
        />

        {(!task.projectId || task.projectId === undefined) && (
            <input type="text"
            className={inputStyles}
            placeholder='Add Project Id'
            value={task.projectId}
            onChange={(e)=> setTask({...task,projectId:e.target.value})}
           />
        )}


        <button
         type='submit'
         className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${
            !isFormValid() || isLoading ? "cursonr-not-allowed opacity-50" : ""
         }`}
         disabled={!isFormValid() || isLoading}
        >
            {isLoading ? "Creating..." : "Create Task"}
        </button>
        
    </form>
  </Modal>
}

export default ModalNewTask