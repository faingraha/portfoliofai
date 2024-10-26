'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { LoadingWrapper } from '@/components/loading-wrapper';

export default function CV() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/cv.md')
      .then((response) => response.text())
      .then((text) => {
        setContent(text);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading CV:', error);
        setIsLoading(false);
      });
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Ron_Gissin_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <LoadingWrapper isLoading={isLoading}>
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
    </LoadingWrapper>
  );
}