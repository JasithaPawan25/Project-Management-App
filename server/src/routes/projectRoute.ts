import { Router } from 'express';
import { createProjects, getProjects } from '../controllers/projectController';
import { get } from 'http';
import { create } from 'domain';

const router = Router();

router.get('/', getProjects);
router.post('/', createProjects);

export default router;