'use client';

import GitHubReposCarousel from "@/components/github-repos-carousel";
import { useEffect, useState } from "react";
import Repo from "@/models/repo"
import { Github } from "lucide-react";

interface RawRepo {
    id: number
    name: string
    description: string
    html_url: string
    languages_url: string
    fork: boolean
}

const CACHE_KEY = 'github_repos_cache';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function GithubRepos() {
    const [repos, setRepos] = useState<Repo[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                // Check if we have cached data
                const cachedData = localStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_EXPIRATION) {
                        setRepos(data);
                        return;
                    }
                }

                // If no valid cache, fetch from API
                const response = await fetch('https://api.github.com/users/RonGissin/repos')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data: RawRepo[] = await response.json()
                
                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array')
                }

                const nonForkedRepos = data.filter(repo => !repo.fork)
                const reposWithLanguages = await Promise.all(nonForkedRepos.map(async (repo) => {
                    const langResponse = await fetch(repo.languages_url)
                    if (!langResponse.ok) {
                        throw new Error(`HTTP error! status: ${langResponse.status}`)
                    }
                    const langData = await langResponse.json()
                    return {
                        id: repo.id,
                        name: repo.name,
                        description: repo.description,
                        html_url: repo.html_url,
                        languages: Object.keys(langData)
                    } as Repo
                }))

                // Cache the fetched data
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data: reposWithLanguages,
                    timestamp: Date.now()
                }));

                setRepos(reposWithLanguages)
            } catch (e) {
                setError(e instanceof Error ? e.message : 'An unknown error occurred')
            }
        }

        fetchRepos()
    }, [])

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
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
    );
}