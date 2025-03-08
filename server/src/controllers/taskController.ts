import { query, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getProjectsDto } from '../dtos/getProjectsDto';
import { commonResponse } from '../dtos/commonResponse';
import { getTaskDto } from '../dtos/getTaskDto';
import { log, trace } from 'console';
import { CreateTaskDto } from '../dtos/CreateTaskDto';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    
    const {projectId} = req.query
    const tasksDto: getTaskDto[] = [];
    const response: commonResponse = new commonResponse();  

    try {
        const tasks = await prisma.task.findMany({ 
            where: { projectId: Number(projectId) },
            include: { author: true,
                assignee: true,
                comments: true,
                attachments: true
             }
         });
        tasks.forEach(task => {
            const taskDto = new getTaskDto();
            const Arr = [];
            taskDto.Id = task.id;
            taskDto.Name = task.title;
            taskDto.Attachments = task.attachments.map(att => ({
                id: att.id,
                fileURL: att.fileURL,
                fileName: att.fileName ?? "",
                taskId: att.taskId,
                uploadedById: att.uploadedById
            }));
            taskDto.Description = task.description ?? '';
            taskDto.status = task.status ?? '';
            tasksDto.push(taskDto);
        });

        response.message = 'Tasks retrieved successfully';
        response.extra = tasks;
        response.success = true;
        res.status(200).json(response);
    } catch (error) {
        trace(`Error getting Tasks - ${error}`);
        response.message = `Error getting Tasks - ${error}`;
        response.extra = tasksDto;
        response.success = false;
        res.status(500).json(response);
       
    }
    
}



export const createTasks = async (req: Request, res: Response): Promise<void> => {
    
    const response: commonResponse = new commonResponse();
    const createTaskDto: CreateTaskDto = req.body;

    try {
        const task = await prisma.task.create({
            data: {
                title: createTaskDto.title,
                description: createTaskDto.description,
                startDate: createTaskDto.startDate,
                dueDate: createTaskDto.dueDate,
                projectId: createTaskDto.projectId,
                authorUserId: createTaskDto.authorId,
                assignedUserId: createTaskDto.assigneeId,
                points: createTaskDto.points,
                status: createTaskDto.status,
                priority:createTaskDto.priority,
                tags:createTaskDto.tags
            },
        });
        response.message = 'New Task created successfully';
        response.extra = task;
        response.success = true;
        res.status(200).json(response);
    } catch (error) {
        trace(`Error in Saving new task - ${error}`);
        response.message = `Error while creating task - ${error}`;
        response.extra = null;
        response.success = false;
        res.status(500).json(response);
       
    }
    
}


export const updateTasks = async (req: Request, res: Response): Promise<void> => {
    
    const response: commonResponse = new commonResponse();
    const createTaskDto: CreateTaskDto = req.body;

    try {
        const task = await prisma.task.update({
            where: {
                id: createTaskDto.id
            },
            data: {
                status: createTaskDto.status,
            }
        });
        response.message = `${task.title} Task updated successfully`;
        response.extra = task;
        response.success = true;
        res.status(200).json(response);
    } catch (error) {
        trace(`Error in updating task - ${error}`);
        response.message = `Error while updating task - ${error}`;
        response.extra = null;
        response.success = false;
        res.status(500).json(response);
       
    }
    
}


export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
    
    const {userID} = req.body;
    const tasksDto: getTaskDto[] = [];
    const response: commonResponse = new commonResponse();  

    try {
        const tasks = await prisma.task.findMany({ 
            where: {
                OR:[
                    { authorUserId: Number(userID) },
                    { assignedUserId: Number(userID) }
                ]
            },
            include: { 
                author: true,
                assignee: true
             }
         });
        tasks.forEach(task => {
            const taskDto = new getTaskDto();
            const Arr = [];
            taskDto.Id = task.id;
            taskDto.Name = task.title;
            taskDto.Description = task.description ?? '';
            taskDto.status = task.status ?? '';
            tasksDto.push(taskDto);
        });

        response.message = 'Tasks retrieved successfully (user wise)';
        response.extra = tasks;
        response.success = true;
        res.status(200).json(response);
    } catch (error) {
        trace(`Error getting Tasks (user wise) - ${error}`);
        response.message = `Error getting Tasks (user wise) - ${error}`;
        response.extra = tasksDto;
        response.success = false;
        res.status(500).json(response);
       
    }
    
}

