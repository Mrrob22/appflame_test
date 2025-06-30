import React, { useState } from 'react';
import { OutputRecipeDto } from '../types/recipe';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { toast } from 'react-toastify';

type Props = {
  recipe: OutputRecipeDto
};

export default function RecipeCard({ recipe }: Props) {
  const { isLoggedIn, token } = useAuth();
  const [liked, setLiked] = useState(recipe.isLiked);
  const [likes, setLikes] = useState(recipe.likeCount);
  const [expanded, setExpanded] = useState(false);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

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
        setLiked(true)
      } else {
        await api.delete(`/recipes/${recipe.id}/like`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setLikes((l) => l - 1)
        setLiked(false)
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        setLiked(true)
        toast.info('Already liked')
      } else {
        toast.error('Error when liking')
      }
    }
  };

  return (
    <div
      onClick={() => setExpanded(prev => !prev)}
      className={`cursor-pointer transition-all duration-300 border rounded-lg shadow hover:shadow-lg p-4 ${
        expanded ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{recipe.title}</h2>
        <button
          onClick={toggleLike}
          className="text-red-600 text-lg"
          title={liked ? 'Unlike' : 'Like'}
        >
          {liked ? '❤️' : '🤍'} {likes}
        </button>
      </div>
      <p className="text-gray-600">Cooking time: {recipe.cookingTime} min.</p>

      {expanded && (
        <div className="mt-2">
          <h3 className="font-medium">Ingredients:</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/recipes/${recipe.id}`;
            }}
            className="mt-3 inline-block text-blue-600 underline text-sm"
          >
            Show full →
          </button>
        </div>
      )}
    </div>
  );
}
