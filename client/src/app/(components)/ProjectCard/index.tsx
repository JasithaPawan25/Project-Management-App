import { getDateOnly } from '@/app/Common/service'
import { Project } from '@/state/api'
import React from 'react'

type Props = {
    project:Project
}

const ProjectCard = ({project}: Props) => {
  return (
    <div className='rounded border p-4 shadow dark:text-white'>
        <h3 className='pb-1'>{`Name : ${project.name}`}</h3>
        <p className='pb-1'>{`Description : ${project.description}`}</p>
        <p className='pb-1'>{`Start Date : ${getDateOnly(project.startDate as string)}`}</p>
        <p className='pb-1'>{`End Date : ${getDateOnly(project.endDate as string)}`}</p>
    </div>
  )
}

export default ProjectCard