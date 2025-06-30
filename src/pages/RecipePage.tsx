import React, { useEffect } from 'react';
import { useParams } from '@tanstack/react-router'
// import { useQuery } from '@tanstack/react-query'
// import { api } from '../services/api'
// import { OutputRecipeDto } from '../types/recipe'

export default function RecipeDetailsPage() {
  const { recipeId } = useParams({ from: '/recipes/$recipeId' })

  const data = {
    id: recipeId,
    title: 'Mocked Recipe',
    description: 'This is a placeholder recipe.',
    cookingTime: 42,
    likeCount: 5,
    isLiked: false,
    ingredients: ['Water', 'Salt', 'Hope'],
  }

  // const {
  //   isLoading,
  //   error,
  // } = useQuery<OutputRecipeDto>({
  //   queryKey: ['recipe', recipeId],
  //   queryFn: async () => {
  //     const response = await api.get(`/recipes/${recipeId}`)
  //     return response.data
  //   },
  // })

  useEffect(() => {
    console.log('Recipe ID:', recipeId)
    console.log('Loaded data:', data)
  }, [data, recipeId])

  // if (isLoading) return <p>Loading...</p>
  // if (error) return <p className="text-red-600">Error loading recipe</p>
  if (!data) return null



  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-700 mb-2">{data.description}</p>
      <p className="text-sm text-gray-500 mb-4">Cooking Time: {data.cookingTime} min</p>

      <h3 className="font-semibold mb-1">Ingredients:</h3>
      <ul className="list-disc list-inside text-sm text-gray-800">
        {data.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

      <p className="text-sm text-gray-600 mt-4">Likes: {data.likeCount}</p>
      <span className="text-3xl text-blue-600 mt-4"> I'm hoping that in future it will be working) </span>
    </div>
  )
}
