import { getSystemPrompt, setSystemPrompt } from '../services/aiService.js';

export const getPrompt = (req, res) => {
    const prompt = getSystemPrompt();
    res.json({ systemPrompt: prompt });
};

export const updatePrompt = (req, res) => {
    const { systemPrompt } = req.body;

    try {
        const newPrompt = setSystemPrompt(systemPrompt);
        res.json({
            message: 'System prompt updated successfully',
            systemPrompt: newPrompt
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
