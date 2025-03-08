"use client";

import React, { useState, useEffect } from 'react';
import ProjectHeader from "@/app/projects/projectHeader";
import BoardView from '../BoadrView';
import ListView from '../ListView';
import TimeLine from '../Timeline';
import Table from '../Table';
import ModalNewTask from '@/app/(components)/ModalNewTask';
import Loading from '@/app/(components)/Loading';

type Props = {
    params: {
        id: string; // This is the id from the URL
    }; 
};

const Project = ({ params }: Props) => {
    const { id } = params;
    const [ activeTab, setActiveTab ] = useState('Board');
    const [ isModalNewTaskOpen, setIsModalNewTaskOpen ] = useState(false);

    return <div>
        {/* Modal New Task */}
        <ModalNewTask isOpen={isModalNewTaskOpen} projectId={parseInt(id)} onClose={()=>setIsModalNewTaskOpen(false)} />


        <ProjectHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab} />

        {/* Board */}  
        {activeTab === 'Board' && (
            <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )} 

        {activeTab === 'List' && (
            <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )} 

        {activeTab === 'Timeline' && (
            <TimeLine id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )} 
        
        {activeTab === 'Table' && (
            <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )} 
          
    </div>
};

export default Project;