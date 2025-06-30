import React from 'react';
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'
import { OutputRecipeDto } from '../types/recipe'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
  recipe: OutputRecipeDto
}

export default function RecipeCard({ recipe }: Props) {
  const { isLoggedIn, token } = useAuth()
  const [liked, setLiked] = useState(recipe.isLiked)
  const [likes, setLikes] = useState(recipe.likeCount)

  const toggleLike = async () => {
    if (!isLoggedIn) {
      toast.info('Login to like')
      return
    }

    try {
      if (!liked) {
        await api.patch(`/recipes/${recipe.id}/like`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setLikes((l) => l + 1)
      } else {
        await api.delete(`/recipes/${recipe.id}/like`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setLikes((l) => l - 1)
      }
      setLiked(!liked)
    } catch {
      toast.error('Error when liking')
    }
  }

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="text-lg font-bold">{recipe.title}</h3>
      <p className="text-sm text-gray-700 line-clamp-3 mb-2">{recipe.description}</p>
      <p className="text-xs text-gray-500">Time: {recipe.cookingTime} min</p>
      <div className="flex justify-between items-center mt-2">
        <button onClick={toggleLike} className="text-red-600 text-sm">
          {liked ? '❤️' : '🤍'} {likes}
        </button>
      </div>
    </div>
  )
}
