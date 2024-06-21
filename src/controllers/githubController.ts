import { Request, Response } from 'express';
import { searchUsers, searchRepositories, getUserRepositories } from '../services/githubService';

export class GitHubController {
    static searchUsers = async (req: Request, res: Response) => {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: 'Query is required' });

        try {
            const data = await searchUsers(query as string);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: 'Error searching users', error: err.message });
        }
    };

    static searchRepositories = async (req: Request, res: Response) => {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: 'Query is required' });

        try {
            const data = await searchRepositories(query as string);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: 'Error searching repositories', error: err.message });
        }
    };

    static getUserRepositories = async (req: Request, res: Response) => {
        const { username } = req.params;
        if (!username) return res.status(400).json({ message: 'Username is required' });

        try {
            const data = await getUserRepositories(username);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching user repositories', error: err.message });
        }
    };
}
