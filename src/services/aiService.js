import openai from '../config/openai.js';

let systemPrompt = "You are a helpful assistant that describes images in detail.";

export const getSystemPrompt = () => systemPrompt;

export const setSystemPrompt = (newPrompt) => {
    if (!newPrompt || typeof newPrompt !== 'string') {
        throw new Error('Invalid prompt provided');
    }
    systemPrompt = newPrompt;
    return systemPrompt;
};

export const processImage = async (base64Image, mimeType) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this image." },
                        {
                            type: "image_url",
                            image_url: {
                                "url": `data:${mimeType};base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 500,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error processing image with OpenAI:", error);
        throw error;
    }
};
