import { query, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getProjectsDto } from '../dtos/getProjectsDto';
import { commonResponse } from '../dtos/commonResponse';
import { getTaskDto } from '../dtos/getTaskDto';
import { log, trace } from 'console';
import { CreateTaskDto } from '../dtos/CreateTaskDto';

const prisma = new PrismaClient();

export const searchTasks = async (req: Request, res: Response): Promise<void> => {
    
    const { searchTxt } = req.body
    const response: commonResponse = new commonResponse();  

    try {
        const tasks = await prisma.task.findMany({ 
            where: searchTxt ?  { OR:[
                { title : { contains: searchTxt as string}},
                { description : { contains: searchTxt as string}},
            
            ] } : {}
         });

         const projects = await prisma.project.findMany({ 
            where: { OR:[
                { name : { contains: searchTxt as string}},
                { description : { contains: searchTxt as string}},
            
            ] }
         });

         const users = await prisma.user.findMany({ 
            where: { OR:[
                { username : { contains: searchTxt as string}} ] }
         });

        

        response.message = 'Tasks retrieved successfully';
        response.extra = {tasks,projects,users};
        response.success = true;
        res.status(200).json(response);
    } catch (error) {
        trace(`Error getting while performing search - ${error}`);
        response.message = `Error getting while performing search - ${error}`;
        response.extra = {};
        response.success = false;
        res.status(500).json(response);
       
    }
    
}