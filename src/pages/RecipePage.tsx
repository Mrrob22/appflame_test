import React from 'react'
import { useParams } from '@tanstack/react-router'

export default function RecipePage() {
  const { recipeId } = useParams({ strict: false })

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Recipe #{recipeId}</h1>
      {/* Тут будет логика загрузки и отображения рецепта */}
    </div>
  )
}