'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

export default function CV() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/cv.md') // Access the file directly from the public folder
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, []);

  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/cv.pdf'; // The path to your PDF file in the public folder
    link.download = 'Ron_Gissin_CV.pdf'; // The name you want the downloaded file to have
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-center mb-6">
        <Button onClick={handleDownload} className="rounded bg-gray-800 hover:bg-gray-700 text-white">
          <Download className="mr-2 h-4 w-4" /> Download as PDF
        </Button>
      </div>
      <div className="prose prose-base mx-auto text-white">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}