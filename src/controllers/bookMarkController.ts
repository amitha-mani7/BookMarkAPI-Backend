

import { parse } from 'csv-parse';
import { Readable } from 'stream';
import { AppDataSource } from '../helper/appDataSource';
import { Bookmark } from '../entity/BookMark';
import { Users } from '../entity/Users';

export class BookmarkController {
    static bookmarkRepo = async (req, res) => {
        const userId = req.userId;
        const { repoId, repoName, repoUrl } = req.body;
        const bookmarkRepository = AppDataSource.getRepository(Bookmark);
        const userRepository = AppDataSource.getRepository(Users);

        const user = await userRepository.findOneBy({ id: userId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const bookmark = new Bookmark();
        // bookmark.repoId = repoId;
        // bookmark.repoName = repoName;
        // bookmark.repoUrl = repoUrl;
        bookmark.repoId = req.body?.repo?.id;
        bookmark.repoName = req.body?.repo?.name;
        bookmark.repoUrl = req.body?.repo?.git_url;
        bookmark.bookmarkedAt = new Date();
        bookmark.user = user;
        console.log("BookMarkJson ",JSON.stringify(bookmark));
        try {
            await bookmarkRepository.save(bookmark);
        } catch (err) {
            return res.status(500).json({ message: 'Error bookmarking repository' });
        }

        res.status(201).json({ message: 'Repository bookmarked' });
    };

    static listBookmarks = async (req, res) => {
        const userId = req.userId;
        const bookmarkRepository = AppDataSource.getRepository(Bookmark);

        const bookmarks = await bookmarkRepository.find({ where: { user: { id: userId } } });
        res.json(bookmarks);
    };

    static importBookmarks = async (req, res) => {
        const userId = req.userId;
        const file = req.file;
        const userRepository = AppDataSource.getRepository(Users);
        const bookmarkRepository = AppDataSource.getRepository(Bookmark);

        const user = await userRepository.findOneBy({ id: userId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const stream = Readable.from(file.buffer.toString());
        const parser = parse({ columns: true });

        stream.pipe(parser);

        for await (const record of parser) {
            const { repoId, repoName, repoUrl } = record;

            const bookmark = new Bookmark();
            bookmark.repoId = repoId;
            bookmark.repoName = repoName;
            bookmark.repoUrl = repoUrl;
            bookmark.bookmarkedAt = new Date();
            bookmark.user = user;

            await bookmarkRepository.save(bookmark);
        }

        res.status(201).json({ message: 'Repositories imported' });
    };
    static removeBookmark = async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;
        const bookmarkRepository = AppDataSource.getRepository(Bookmark);
    
        try {
          const bookmark = await bookmarkRepository.findOne({ where: { id, user: { id: userId } } });
          if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
          }
    
          await bookmarkRepository.remove(bookmark);
          res.status(200).json({ message: 'Bookmark removed successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Failed to remove bookmark', error });
        }
      };
}
