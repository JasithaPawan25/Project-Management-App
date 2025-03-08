import { Router } from 'express';
import { getUsers } from '../controllers/userController';
import { getTeams } from '../controllers/teamController';

const router = Router();

router.get('/', getTeams);

export default router;