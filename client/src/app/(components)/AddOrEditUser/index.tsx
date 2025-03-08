import { User } from '@/state/api';
import React, { useState } from 'react'
import Header from '../Header';


const AddOrEditUser = () => {

    const userState = () => ({
        username: "",
        email: "",
        roleName: "",
        teamName: ""
    });

    const [user, setUser] = useState(userState);

    const lableStyles = "block text-sm font-medium dark:text-white";
    const commonWidthStyles = "w-[50%]";
    const textStyles = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";
    const buttonStyles = "block bg-gray-500 hover:bg-gray-600 text-white rounded-md pt-[8px] pr-[35px] pb-[8px] pl-[35px] text-sm font-medium dark:text-white";
  return (
    <div>
        <div className='space-y-4'>
            <Header name='Add User' isSmallText />
            <div className={commonWidthStyles}>
                <label className={lableStyles}>User Name</label>
                <input type='text'  className={textStyles} value={user.username} placeholder='john Doe' />
                
            </div>
            <div className={commonWidthStyles}>
                <label className={lableStyles}>Email</label>
                <input type='email'  className={textStyles} value={user.email} placeholder='john@gmail.com' />
            </div>
            <div className={commonWidthStyles}>
                <label className={lableStyles}>Role Name</label>
                <input type='text'  className={textStyles} value={user.roleName} placeholder='Developer' />
            </div>
            <div className={commonWidthStyles}>
                <label className={lableStyles}>Team Name</label>
                <input type='text'  className={textStyles} value={user.teamName} placeholder='Purple Team' />
            </div>
            <div>
                <button className={buttonStyles}>Add User</button>
               
            </div>
        </div>
    </div>
  )
}

export default AddOrEditUser