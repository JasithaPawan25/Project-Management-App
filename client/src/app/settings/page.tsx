"use client";

import React, { useState } from 'react'
import Header from '../(components)/Header';
import { Card } from '@mui/material';
import { ArrowLeft, Columns, Rows } from 'lucide-react';
import AddOrEditUser from '../(components)/AddOrEditUser';

type Props = {}

const Settings = (props: Props) => {
    const [showAddUser, setShowAddUser] = useState(false);

    const handleAddUserClick = () => {
        setShowAddUser(true);
    };

    const descriptionStyles = "pt-[9px] text-[#808080a6] font-[11px] font-medium leading-[16px] "
    const lableStyles = "block text-sm font-medium cursor-pointer dark:text-white";
    const commonWidthStyles = "w-[50%]";
    const textStyles = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";
    const buttonStyles = "block bg-gray-500 hover:bg-gray-600 text-white rounded-md pt-[8px] pr-[35px] pb-[8px] pl-[35px] text-sm font-medium dark:text-white";
  return (
    <div className='p-8'>
        <Header name='Settings' />
        <div className='mb-5'>
            <Header name='User Settings' isSmallText  />
            <div className={`grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-col-3 lg:gap-6 ${showAddUser ? "hidden" : ""} `}>
                        <Card className="p-8 cursor-pointer" onClick={handleAddUserClick}>
                            <label className={lableStyles}>Manage User</label>
                            <p className={descriptionStyles}>Click here to add, edit, or remove users from the system. You can manage user roles, assign them to teams, and update their information.</p>
                        </Card>
            </div>
        </div>
        {showAddUser && 
        <div className=''>
            <ArrowLeft className='absolute cursor-pointer' onClick={()=> setShowAddUser(false)} />
            <div className='ml-[50px]'>
                <AddOrEditUser />
            </div>
        </div>
        }
    </div>
  )
}

export default Settings