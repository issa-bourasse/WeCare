import React, { useState, useEffect } from 'react';
import { generateResponse } from '../openai/openai';
import { Button, TextField, CircularProgress, Box, Typography } from '@mui/material';

const ChatBox = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);

    // Initialize Speech Recognition for Voice Input
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // AI Personality
    const aiName = "We Care";
    const aiGreeting = `Hello, I am ${aiName}. How can I assist you today?`;

    useEffect(() => {
        console.log(aiGreeting);
    }, []);

    const handleVoiceInput = () => {
        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            recognition.start();
            setIsListening(true);
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            console.log(`${aiName} heard: ${transcript}`);
        };

        recognition.onend = () => {
            setIsListening(false);
            // Submit the voice input automatically
            handleSubmit();
        };
    };

    // Text-to-Speech function
    const speakResponse = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set the language (optional)
        utterance.rate = 1; // Speed of the speech (1 is normal speed)
        utterance.pitch = 1; // Pitch of the speech (1 is normal pitch)
        window.speechSynthesis.speak(utterance);
    };

    // Handle form submission to get response from OpenAI API
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        try {
            const result = await generateResponse(input);
            setResponse(result);
            speakResponse(result); // Trigger Text-to-Speech after getting the response
        } catch (error) {
            setResponse("Error: Unable to fetch response. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Chat with The Prime Gim Assistant (We Care )
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
                <TextField
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    variant="outlined"
                    margin="normal"
                    disabled={isLoading}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="contained"
                        onClick={handleVoiceInput}
                        disabled={isLoading}
                        sx={{ backgroundColor: '#28a745' }}
                    >
                        {isListening ? 'Stop Listening' : 'Start Voice Input'}
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        sx={{ backgroundColor: '#007bff', marginLeft: 1 }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </Box>
            </form>
            {response && (
                <Box sx={{ marginTop: 3, padding: 2, width: '100%', maxWidth: '500px', border: '1px solid #ddd', borderRadius: 2 }}>
                    <Typography variant="body1">
                        <strong>Response:</strong> {response}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ChatBox;
