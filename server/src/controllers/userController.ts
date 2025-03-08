import { query, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getProjectsDto } from '../dtos/getProjectsDto';
import { commonResponse } from '../dtos/commonResponse';
import { getTaskDto } from '../dtos/getTaskDto';
import { log, trace } from 'console';
import { CreateTaskDto } from '../dtos/CreateTaskDto';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    
    const response: commonResponse = new commonResponse();  

    try {
        const users = await prisma.user.findMany({
            include: { team:true }
        });

          
        const usersWithTeam = users.map((user: any) => {
            return {
                ...user,
                teamName: user.team?.teamName || "No Team"
            };
        });


        response.message = 'Users retrieved successfully';
        response.extra = usersWithTeam;
        response.success = true;
        res.status(200).json(response);
    } catch (error) {
        trace(`Error getting Users - ${error}`);
        response.message = `Error getting Users - ${error}`;
        response.extra = [];
        response.success = false;
        res.status(500).json(response);
       
    }
    
}