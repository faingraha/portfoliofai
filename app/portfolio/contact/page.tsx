"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function ContactMe() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send email, e.g., using EmailJS or a backend API
    console.log("Email Sent:", { subject, message });
    alert("Your message has been sent!");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] text-white animate-fade-in">
      <Card className="rounded w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Get in touch</CardTitle>
          <CardDescription>Send me a message and I'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Your name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded bg-gray-800 border-gray-700 focus:border-gray-600 focus:ring-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
              <Input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="rounded bg-gray-800 border-gray-700 focus:border-gray-600 focus:ring-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="rounded bg-gray-800 border-gray-700 focus:border-gray-600 focus:ring-gray-600 min-h-[150px]"
              />
            </div>
            <Button
              type="submit"
              className="rounded w-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300"
            >
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}