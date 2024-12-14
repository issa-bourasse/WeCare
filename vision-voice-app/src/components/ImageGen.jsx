import React, { useState } from 'react';
import { generateImage } from '../api/openai';
import { Button, TextField, CircularProgress, Box, Typography } from '@mui/material';

function ImageGen() {
    const [imageUrl, setImageUrl] = useState('');
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageGen = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setError('');
        
        try {
            const url = await generateImage(prompt);
            setImageUrl(url);
        } catch (error) {
            setError('Failed to generate image. Please try again.');
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2, 
            padding: 2 
        }}>
            <Typography variant="h4">Generate Image</Typography>
            
            <TextField
                fullWidth
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter image description..."
                variant="outlined"
                disabled={loading}
                sx={{ maxWidth: 600 }}
            />

            <Button 
                variant="contained" 
                onClick={handleImageGen}
                disabled={loading || !prompt.trim()}
            >
                {loading ? <CircularProgress size={24} /> : 'Generate Image'}
            </Button>

            {error && (
                <Typography color="error">{error}</Typography>
            )}

            {imageUrl && (
                <Box sx={{ mt: 2, maxWidth: '100%' }}>
                    <img 
                        src={imageUrl} 
                        alt="Generated" 
                        style={{ 
                            maxWidth: '100%', 
                            height: 'auto',
                            borderRadius: '8px'
                        }} 
                    />
                </Box>
            )}
        </Box>
    );
}

export default ImageGen;
