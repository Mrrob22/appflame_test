import React, { useEffect, useRef, useState } from 'react'
import { useRecipes } from '../hooks/useRecipes'
import RecipeCard from '../components/RecipeCard'
import RecipeFilters, { Filters } from '../components/RecipeFilters'

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({})
  const [showFilters, setShowFilters] = useState(false)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useRecipes(filters)

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

  if (isLoading) return <p className="p-4">ЗLoading recipes...</p>
  if (error) return <p className="p-4 text-red-600">Error due loading</p>

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="text-blue-600 underline"
        >
          {showFilters ? 'Hide filters' : 'Show filters'}
        </button>
      </div>
      {showFilters && (
        <RecipeFilters
          value={filters}
          onChange={(newFilters) => setFilters(newFilters)}
          onClose={() => setShowFilters(false)}
        />
      )}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data?.pages.flat().map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        <div ref={loadMoreRef} className="h-1 col-span-full"></div>
      </div>
    </div>
  )
}
