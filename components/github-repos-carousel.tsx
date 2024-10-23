'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import Repo from '@/models/repo'

interface GitHubReposCarouselProps {
    repos: Repo[]
}

export default function GitHubReposCarousel({ repos }: GitHubReposCarouselProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {repos?.map((repo) => (
            <CarouselItem key={repo.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="bg-gray-800 text-white h-full rounded">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                        {repo.name}
                      </a>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {repo.description || ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {repo.languages?.map((lang) => (
                        <Badge key={lang} variant="secondary" className="bg-gray-700 text-gray-200">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}