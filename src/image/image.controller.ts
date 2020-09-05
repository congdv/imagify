import { Router } from 'express';
import multer from 'multer';

import { imageFilter } from 'core/utils/upload';
import { uploadImage, getImages, getImage } from './image.service';

const router = Router();
export default router;

const upload = multer({ dest: `upload/`, fileFilter: imageFilter });

router.post('/image/upload', upload.any(), uploadImage);
router.get('/image', getImages);
router.get('/image/:id', getImage);
