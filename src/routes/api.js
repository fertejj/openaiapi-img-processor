import express from 'express';
import upload from '../middleware/upload.js';
import { uploadAndProcessImage } from '../controllers/imageController.js';
import { getPrompt, updatePrompt } from '../controllers/configController.js';

const router = express.Router();

/**
 * @swagger
 * /api/process-image:
 *   post:
 *     summary: Upload an image and get a text description
 *     tags: [Image Processing]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The image description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Bad request (no file)
 *       500:
 *         description: Server error
 */
router.post('/process-image', upload.single('image'), uploadAndProcessImage);

/**
 * @swagger
 * /api/system-prompt:
 *   get:
 *     summary: Get the current system prompt
 *     tags: [Configuration]
 *     responses:
 *       200:
 *         description: Current system prompt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 systemPrompt:
 *                   type: string
 *   put:
 *     summary: Update the system prompt
 *     tags: [Configuration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               systemPrompt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prompt updated successfully
 *       400:
 *         description: Invalid input
 */
import { body, validationResult } from 'express-validator';

const validatePrompt = [
    body('systemPrompt')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('System prompt must be a non-empty string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.get('/system-prompt', getPrompt);
router.put('/system-prompt', validatePrompt, updatePrompt);

export default router;
