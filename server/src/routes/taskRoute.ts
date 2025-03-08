import { Router } from 'express';
import { createProjects, getProjects } from '../controllers/projectController';
import { get } from 'http';
import { create } from 'domain';
import { createTasks, getTasks, getUserTasks, updateTasks } from '../controllers/taskController';

const router = Router();

router.get('/', getTasks);
router.post('/', createTasks);
router.post('/update', updateTasks);

router.post('/user/task', getUserTasks);

export default router;