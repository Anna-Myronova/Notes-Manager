import { Router } from 'express';
import { createNote, getNotes } from './notes/controllers/noteController';

const router = Router();

router.get('/notes', getNotes);
router.post('/notes', createNote);

export default router;