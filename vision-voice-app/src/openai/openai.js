// openai.js
import axios from 'axios';

const openaiApi = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "",
    },
});

export const generateResponse = async (prompt) => {
    try {
        const response = await openaiApi.post('/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an AI assistant named "We Care". You are helpful, friendly, and always ready to assist.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 100,
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
};

export const generateImage = async (prompt) => {
    try {
        const response = await openaiApi.post('/images/generations', {
            model: 'dall-e-3',
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "url"
        });
        return response.data.data[0].url;
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        throw error;
    }
};