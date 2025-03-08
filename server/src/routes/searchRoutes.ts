import { Router } from 'express';
import { createProjects, getProjects } from '../controllers/projectController';
import { get } from 'http';
import { create } from 'domain';
import { searchTasks } from '../controllers/searchController';

const router = Router();

router.post('/', searchTasks);

export default router;