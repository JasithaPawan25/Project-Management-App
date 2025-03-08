"use client";
import { useGetUsersQuery } from '@/state/api';
import React from 'react'
import { useAppSelector } from '../redux';
import Loading from '../(components)/Loading';
import Header from '../(components)/Header';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridValueOptionsParams } from '@mui/x-data-grid';
import Image from 'next/image';
import { dataGridClassNames, dataGridSxStyles } from '../lib/utils';


const CustomToolbar = ()=> (
    <GridToolbarContainer className='toolbar flex gap-2'>
        <GridToolbarFilterButton />
        <GridToolbarExport />
    </GridToolbarContainer>
)

const columns: GridColDef[] = [
    {field :"userId",headerName:"ID",width: 50,headerAlign:"center", align:"center"},
    {field :"profilePictureUrl",headerName:"Profile Picture",width:175,headerAlign:"center",align:"center",
        renderCell:(params)=>(
            <div className='flex h-full w-full items-center justify-center'>
                <div className='h-9 w-9'>
                    <Image
                      src={`/icons/${params.value}`}
                      alt={params.row.username}
                      width={100}
                      height={50}
                      className='h-full rounded-full object-cover'
                    />
                </div>
            </div>
        )
    },
    {field :"username",headerName:"User Name",width:250, headerAlign:"center",align:"center"},
    {field :"teamName",headerName:"Team",width:250, headerAlign:"center",align:"center"},
]

const Users = () => {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const isDarkMode = useAppSelector((state)=> state.global.isDarkMode);

    if(isLoading) return <Loading isLoading={true} />
    if(isError || !users) return <div>Error fetching users</div>

  return (
    <div className='flex w-full flex-col p-8'>
        <Header name='Users' />
        <div style={{height:650,width:"calc(100vw - 100px)"}}>
            <DataGrid
              rows={users.extra || []}
              columns={columns}
              getRowId={(row)=>row.userId}
              pagination
              slots={{
                toolbar:CustomToolbar
              }}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
        </div>
    </div>
  )
}

export default Users