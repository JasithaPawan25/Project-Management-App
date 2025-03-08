import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getProjectsDto } from '../dtos/getProjectsDto';
import { commonResponse } from '../dtos/commonResponse';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    
    const projectsDto: getProjectsDto[] = [];
    const response: commonResponse = new commonResponse();

    try {
        const projects = await prisma.project.findMany();
        projects.forEach(project => {
            const projectDto = new getProjectsDto();
            projectDto.id = project.id;
            projectDto.name = project.name;
            projectDto.startDate = project.startDate;
            projectDto.endDate = project.endDate;
            projectDto.desription = project.description;
            projectsDto.push(projectDto);
        });

        response.message = 'Projects retrieved successfully';
        response.extra = projectsDto;
        response.success = true;
        res.status(200).json(response);
    } catch (error) {
        response.message = 'Error getting projects';
        response.extra = projectsDto;
        response.success = false;
        res.status(500).json(response);
       
    }
    
}

export const createProjects = async (req: Request, res: Response): Promise<void> => {
    
    const response: commonResponse = new commonResponse();

    
    try {
        const projects = await prisma.project.create({data: {
            name: req.body.name,
            description: req.body.description,
            startDate:  req.body.startDate,
            endDate:  req.body.endDate,
            // Add other properties as needed, but do not include id
        }});
        response.message = 'Projects created successfully';
        response.extra = projects;
        response.success = true;
        res.status(200).json(response);
    } catch (error) {
        response.message = `Error while creating project - ${error}`;
        response.extra = null;
        response.success = false;
        res.status(500).json(response);
       
    }
    
}
