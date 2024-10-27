import Repo from '@/models/repo';

interface RawRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    languages_url: string;
    fork: boolean;
}

interface CacheData {
    data: Repo[];
    timestamp: number;
}

export class GithubClient {
    private baseUrl: string = 'https://api.github.com';
    private CACHE_KEY_PREFIX: string = 'github_repos_cache_';
    private CACHE_EXPIRATION: number = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    private getCacheKey(username: string): string {
        return `${this.CACHE_KEY_PREFIX}${username}`;
    }

    private getCache(username: string): CacheData | null {
        const cacheKey = this.getCacheKey(username);
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData) as CacheData;
        }
        return null;
    }

    private setCache(username: string, data: Repo[]): void {
        const cacheKey = this.getCacheKey(username);
        const cacheData: CacheData = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    }

    async GetRepos(username: string, includeForks: boolean = true): Promise<Repo[]> {
        try {
            // Check if we have cached data for this user
            const cachedData = this.getCache(username);
            if (cachedData && (Date.now() - cachedData.timestamp < this.CACHE_EXPIRATION)) {
                return cachedData.data;
            }

            // If no valid cache, fetch from API
            const response = await fetch(`${this.baseUrl}/users/${username}/repos`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: RawRepo[] = await response.json();

            if (!Array.isArray(data)) {
                throw new Error('Data is not an array');
            }

            const filteredRepos = includeForks ? data : data.filter(repo => !repo.fork);
            const reposWithLanguages = await Promise.all(filteredRepos.map(async (repo) => {
                const langResponse = await fetch(repo.languages_url);
                if (!langResponse.ok) {
                    throw new Error(`HTTP error! status: ${langResponse.status}`);
                }
                const langData = await langResponse.json();
                return {
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    html_url: repo.html_url,
                    languages: Object.keys(langData)
                } as Repo;
            }));

            // Cache the fetched data for this user
            this.setCache(username, reposWithLanguages);

            return reposWithLanguages;
        } catch (error) {
            console.error('Error fetching repos:', error);
            throw error;
        }
    }
}