import { useRecipes } from '../hooks/useRecipes'
import RecipeCard from '../components/RecipeCard'
import { useEffect, useRef } from 'react'
import React from 'react';

export default function HomePage() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useRecipes()

    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
              if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                  fetchNextPage()
              }
          },
          { threshold: 1 }
        )

        if (loadMoreRef.current) observer.observe(loadMoreRef.current)
        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage])

    if (isLoading) return <p className="p-4">Loading more recipes...</p>
    if (error) return <p className="p-4 text-red-600">Error loading</p>

    return (
      <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data?.pages.flat().map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          <div ref={loadMoreRef} className="h-1 col-span-full"></div>
      </div>
    )
}
