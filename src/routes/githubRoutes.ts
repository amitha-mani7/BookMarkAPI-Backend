
import { Router } from 'express';
import { GitHubController } from '../controllers/githubController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/search/users', verifyToken, GitHubController.searchUsers);
router.get('/search/repositories', verifyToken, GitHubController.searchRepositories);
router.get('/users/:username/repos', verifyToken, GitHubController.getUserRepositories);

export default router;
