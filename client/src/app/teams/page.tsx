"use client";

import { useGetTeamsQuery, useGetUsersQuery } from '@/state/api';
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
    {field :"id",headerName:"Team ID",width: 100,headerAlign:"center", align:"center"},
    {field :"teamName",headerName:"Team Name",width: 150,headerAlign:"center", align:"center"},
    {field :"pOwner",headerName:"Product Owner",width: 150,headerAlign:"center", align:"center"},
    {field :"pManager",headerName:"Product Manager",width: 150,headerAlign:"center", align:"center"}
]

const Teams = () => {
    const { data: teams, isLoading, isError } = useGetTeamsQuery();
    const isDarkMode = useAppSelector((state)=> state.global.isDarkMode);

    if(isLoading) return <Loading isLoading={true} />
    if(isError || !teams) return <div>Error fetching teams</div>

  return (
    <div className='flex w-full flex-col p-8'>
        <Header name='Teams' />
        <div style={{height:650,width:"calc(100vw - 100px)"}}>
            <DataGrid
              rows={teams.extra || []}
              columns={columns}
              getRowId={(row)=>row.id}
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

export default Teams