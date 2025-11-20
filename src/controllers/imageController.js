import { processImage } from '../services/aiService.js';

export const uploadAndProcessImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const base64Image = req.file.buffer.toString('base64');
        const mimeType = req.file.mimetype;

        const description = await processImage(base64Image, mimeType);

        res.json({
            message: 'Image processed successfully',
            description: description
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process image' });
    }
};
