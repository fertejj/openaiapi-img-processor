import { processImage } from '../services/aiService.js';

export const uploadAndProcessImage = async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No image data provided' });
        }

        let base64Image = image;
        let mimeType = 'image/jpeg'; // Default

        // Check if it's a data URI
        if (image.startsWith('data:')) {
            const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (matches && matches.length === 3) {
                mimeType = matches[1];
                base64Image = matches[2];
            } else {
                return res.status(400).json({ error: 'Invalid image format' });
            }
        }

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
