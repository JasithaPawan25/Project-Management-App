import { query, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getProjectsDto } from '../dtos/getProjectsDto';
import { commonResponse } from '../dtos/commonResponse';
import { getTaskDto } from '../dtos/getTaskDto';
import { log, trace } from 'console';
import { CreateTaskDto } from '../dtos/CreateTaskDto';

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
    
    const response: commonResponse = new commonResponse();  

    try {
        const teams = await prisma.team.findMany();
        
        const teamsWithUserNames = await Promise.all(
            teams.map(async (team:any)=> {
                const productOwner = await prisma.user.findUnique({
                    where:{userId:team.productOwnerUserId!},
                    select:{ username : true}
                });

                const productManager = await prisma.user.findUnique({
                    where:{userId:team.projectManagerUserId!},
                    select:{ username: true}
                });

                return {
                    ...team,
                    pManager:productManager?.username,
                    pOwner:productOwner?.username
                }
            } ));

        response.message = 'Teams with user names retrieved successfully';
        response.extra = teamsWithUserNames;
        response.success = true;
        res.status(200).json(response);
    } catch (error) {
        trace(`Error getting teams with user names - ${error}`);
        response.message = `Error teams with user names - ${error}`;
        response.extra = [];
        response.success = false;
        res.status(500).json(response);
       
    }
    
}