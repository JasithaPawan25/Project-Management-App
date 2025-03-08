import Header from '@/app/(components)/Header';
import TaskCard from '@/app/(components)/TaskCard';
import { Task,useGetTasksQuery } from '@/state/api';
import React from 'react'

type Props = {
    id:string;
    setIsModalNewTaskOpen:(isOpen:boolean)=> void;
}

const ListView = ( {id, setIsModalNewTaskOpen} : Props) => {
    const {
        data:tasks,
        error,
        isLoading
    } = useGetTasksQuery({projectId: Number(id)});

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occured while fetching tasks...</div>;


  return (
    <div className='px-4 pb-8 xl:px-6'>
        <div className='pt-5'>
            <Header name='List'
              buttonComponent={
                <button
                className='flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                onClick={()=> setIsModalNewTaskOpen(true)}
                >
                  Add New Task
                </button>
              }
            />
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-col-3 lg:gap-6'>
            {tasks?.extra?.map((task:Task)=> <TaskCard key={task.id} task={task} />)}
        </div>

    </div>
  )
}

export default ListView

