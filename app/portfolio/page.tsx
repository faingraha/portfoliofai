'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import { LoadingWrapper } from '@/components/ui/loading-wrapper';

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

    return (
        <LoadingWrapper isLoading={isLoading}>
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
        </LoadingWrapper>
    );
}