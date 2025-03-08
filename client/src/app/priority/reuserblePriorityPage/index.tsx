"use client";

import React, { useEffect, useState } from 'react'
import { Priority, Task, useGetUserTasksMutation } from '@/state/api'
import { useAppSelector } from '@/app/redux';
import Loading from '@/app/(components)/Loading';
import ModalNewTask from '@/app/(components)/ModalNewTask';
import Header from '@/app/(components)/Header';
import TaskCard from '@/app/(components)/TaskCard';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/app/lib/utils';
import { formatDateTime } from '@/app/Common/service';

type Props = {
    priority: Priority;
}

const columns: GridColDef[]=[
 {
    field:"title",
    headerName:"Title",
    width:100
 },
 {
    field:"description",
    headerName:"Description",
    width:200
 },
 {
    field:"status",
    headerName:"Status",
    width:130,
    renderCell:(params)=>(
        <span className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>
            {params.value}
        </span>
    )
 },
 {
    field:"priority",
    headerName:"Priority",
    width:75
 },
 {
    field:"tags",
    headerName:"Tags",
    width:130
 },
 {
    field:"startDate",
    headerName:"Start Date",
    width:220,
    renderCell:(params)=> params.value ? formatDateTime(params.value) :"N/A"
 },
 {
    field:"dueDate",
    headerName:"Due Date",
    width:220,
    renderCell:(params)=> params.value ? formatDateTime(params.value) :"N/A"
 },
 {
    field:"author",
    headerName:"Author",
    width:150,
    renderCell:(params)=> params.value.username || "Unknown"
 },
 {
    field:"assignee",
    headerName:"Assignee",
    width:150,
    renderCell:(params)=> params.value.username || "Unassigned"
 },
];

const ReusablePriorityPage = ({ priority }: Props) => {
    const [ view, setView] = useState("list");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    const [search, { data: tasks, isLoading, isError:isTasksError }] = useGetUserTasksMutation();

    useEffect(() => {
                search({ userID: "1" }); // Call the mutation with an object payload
    }, [search]);

    const isDarkMode = useAppSelector((state)=> state.global.isDarkMode);
    const filteredTasks = tasks?.extra.filter((task:Task)=> task.priority == priority);

    if(isTasksError || !tasks) return <div>Error fetching tasks...</div>
    if(isLoading) return <Loading isLoading={true} />

  return (
    <div className='m-5 p-4'>
        <ModalNewTask isOpen={isModalNewTaskOpen} onClose={()=> setIsModalNewTaskOpen(false)} />
        <Header name='Priority Page' buttonComponent={
            <button
              className='mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
              onClick={() => setIsModalNewTaskOpen(true)}
              >Add Task</button>
        } />   

        <div className='mb-4 flex justify-start'>
            <button
              className={`px-4 py-2 ${
                view === "list" ? "bg-gray-300" : "bg-white"
              } rounded-l`}
              onClick={()=>setView("list")}
            >List</button>
            <button
              className={`px-4 py-2 ${
                view === "table" ? "bg-gray-300" : "bg-white"
              } rounded-l`}
              onClick={()=>setView("table")}
            >Table</button>
        </div>
        {isLoading ? (<Loading isLoading={true} />) : view === "list" ? 
         <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-col-3 lg:gap-6'>
                    {filteredTasks?.map((task:Task)=> <TaskCard key={task.id} task={task} />)}
         </div>
        : (
            view === "table" && filteredTasks && (
                <div className='w-full'>
                    <DataGrid
                        rows={filteredTasks}
                        scrollbarSize={1}
                        columns={columns}
                        checkboxSelection
                        getRowId={(row)=> row.id}
                        className={dataGridClassNames}
                        sx={dataGridSxStyles(isDarkMode)}
                    />
                </div>
            )
        )}

    </div>
  )
}

export default ReusablePriorityPage