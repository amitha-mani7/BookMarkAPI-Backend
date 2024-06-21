import { Router } from 'express';

import multer from 'multer';
import { BookmarkController } from '../controllers/bookMarkController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();
const upload = multer();

router.post('/bookmark', verifyToken, BookmarkController.bookmarkRepo);
router.get('/bookmarks', verifyToken, BookmarkController.listBookmarks);
router.post('/import-bookmarks', verifyToken, upload.single('file'), BookmarkController.importBookmarks);
router.delete('/bookmark/:id', verifyToken, BookmarkController.removeBookmark);

export default router;
