import { Status, Task } from '@/state/api'
import Image from 'next/image'
import { format } from "date-fns";
import React from 'react'

type Props = {
    task:Task
}



    const statusColor: Record<Status, string> = {
        [Status.Todo]: "#059669",
        [Status.WorkInProgress]: "#D97706",
        [Status.InProgress]: "#D97706",
        [Status.Done]: "#10B981",
        [Status.Approved]: "#3B82F6",
        [Status.Completed]: "#000000",
        [Status.UnderReview]: "#F59E0B",
        [Status.Open]: "#FF0000",
        [Status.Ongoing]: "#00FF00",
        [Status.Cancelled]: "#0000FF",
        [Status.InReview]: "#FFFF00",
        [Status.Blocked]: "#FF6347", // Added missing status
        [Status.Waiting]: "#FFD700", // Added missing status
        [Status.Rejected]: "#8B0000"
    }

const TaskCard = ({task}: Props) => {
  return (
    <div className='mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white'>
            
            <div
                className={`w-fit mb-2 rounded-full px-2 py-1 text-xs font-semibold
                    ${task.status === Status.Todo ? "bg-red-200 text-red-700":
                        task.status === Status.Approved ? "bg-yellow-200 text-yellow-700":
                        task.status === Status.WorkInProgress ? "bg-green-200 text-green-700" :
                        task.status === Status.Completed ? "bg-blue-200 text-blue-700"
                            : "bg-gray-200 text-gray-700"
                    }
                `}
            >
            { task.status }
            </div>
            
            {task.attachments && task.attachments.length > 0 && (
                <div className='mb-3'>
                    <div className='text-sm text-gray-400 mt-3 leading-4 font-semibold'>Attachments</div>
                        <div className='flex mt-1 flex-wrap'>

                            {task.attachments && task.attachments.length > 0 && (
                                <Image
                                    src={`/icons/${task?.attachments[0].fileURL}`}
                                    alt={task?.attachments?.[0]?.fileName || ''}
                                    width={200}
                                    height={200}
                                    className='rounded-md'
                                />
                            )}

                        </div>
                </div>
            )}

                   
                    
                    <p>
                        <div className='text-sm text-gray-400 mt-3 leading-4 font-semibold'>Title</div>
                        <div className='text-lg font-semibold'>{task.title}</div>
                        <div className='text-sm leading-4 text-gray-600 font-semibold'> {task.startDate ? "from "+ format(new Date(task.startDate),"P") : "Not set"}
                        {task.dueDate ? " to " + format(new Date(task.dueDate),"P") : "Not set"} 
                        </div>
                    </p>

                    <p>
                        <div className='text-sm mt-3 leading-4 text-gray-400 font-semibold'>Description</div>
                        <div className='text-base font-semibold'>{" "} {task.description || "No description provided"}</div>
                    </p>
                    {/* <p>
                        <strong>Description:</strong>{" "} {task.description || "No description provided"}
                    </p>
                    <p>
                        <strong>Status:</strong>{task.status}
                    </p> */}
                    <p>
                    <div className='text-sm mt-3 leading-4 text-gray-400 font-semibold'>Priority</div>
                        <strong className={`
                            ${task.priority === "High" ? " text-red-700":
                                task.priority === "Low" ? "text-yellow-700":
                                task.priority === "Urgent" ? "text-green-700" :
                                task.priority === "Backlog" ? "text-blue-700"
                                    : "text-gray-700"
                            }
                        `} >{task.priority}</strong>
                    </p>

                    <p>
                        <div className='text-sm mt-3 leading-4 text-gray-400 font-semibold'>Tags</div>
                        <div className='text-base font-semibold'>{" "} {task.tags || "No tags"}</div>
                    </p>

                    <p>
                        <div className='text-sm mt-3 leading-4 text-gray-400 font-semibold'>Author</div>
                        <div className='text-base font-semibold'>{" "} {task.author ? task.author.username : "Unknown"}</div>
                    </p>

                    <p>
                        <div className='text-sm mt-3 leading-4 text-gray-400 font-semibold'>Assignee</div>
                        <div className='text-base font-semibold'>{" "} {task.assignee ? task.assignee.username : "Unassigned"}</div>
                    </p>
                       
    
    </div>
  )
}

export default TaskCard