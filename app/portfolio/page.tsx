'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function AboutMe() {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('/about_me.md') // Access the file directly from the public folder
        .then((response) => response.text())
        .then((text) => setContent(text));
    }, []);

    return (
        <div className="animate-fade-in prose prose-base mx-auto text-white">
            {/* Reduce vertical margin between image and markdown */}
            <div className="flex justify-center items-center mb-4"> {/* mb-4 adds small margin below the image */}
                <img
                    src="/profile.jpg"
                    alt="Profile picture"
                    className="rounded-full w-64 h-64 object-cover"
                />
            </div>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}