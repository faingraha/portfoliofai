"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type ToastProps } from "@/components/ui/toast"

const greenToast: ToastProps = {
  className: "bg-green-800 rounded text-white border-green-600",
  duration: 3000,
}

export default function ContactMe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    });
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    const templateParams = {
      name,
      email,
      subject,
      message,
    };
  
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      );
      
      console.log("Email sent successfully:", response.status, response.text);
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully!",
        ...greenToast
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] text-white animate-fade-in">
      <Card className="rounded w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Get in touch</CardTitle>
          <CardDescription>Send me a message and I&apos;ll get back to you as soon as possible.</CardDescription>
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
              <Label htmlFor="email" className="text-sm font-medium">Your email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}