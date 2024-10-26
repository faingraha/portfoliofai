'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from "next/image";

export default function AboutMe() {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/about_me.md')
        .then((response) => response.text())
        .then((text) => {
            setContent(text);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error loading markdown:', error);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in prose prose-base mx-auto text-white">
            <div className="flex justify-center items-center mb-4">
                <Image 
                    src="/profile.jpg"
                    alt="Profile picture" 
                    width={200}
                    height={200}
                    className="rounded-full w-64 h-64 object-cover"
                />
            </div>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}