'use client';

import { useEffect, useState } from "react";
import GitHubReposCarousel from "@/components/ui/github-repos-carousel";
import Repo from "@/models/repo"
import { Github } from "lucide-react";
import { LoadingWrapper } from '@/components/ui/loading-wrapper';
import { GithubClient } from '@/lib/github/github-client';

export default function GithubRepos() {
    const [repos, setRepos] = useState<Repo[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchRepos = async () => {
            const githubClient = new GithubClient();
            try {
                const reposData = await githubClient.GetRepos('RonGissin', false);
                setRepos(reposData);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRepos();
    }, []);

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <LoadingWrapper isLoading={isLoading}>
            <div className="animate-fade-in">
                <div className="text-center mt-24">
                    <a href="https://github.com/RonGissin"
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="inline-block text-white p-2 transition-colors duration-300">
                        <Github size={100} />
                    </a>
                </div>
                <div className="-mt-48">
                    <GitHubReposCarousel repos={repos} />
                </div>
            </div>
        </LoadingWrapper>
    );
}