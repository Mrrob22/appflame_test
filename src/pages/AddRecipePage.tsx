import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'
import { toast } from 'react-toastify'
import type { CreateRecipeDto } from '../types/recipe'
import React from 'react';

export default function AddRecipePage() {
    const { isLoggedIn, token } = useAuth()


    // If user comes via link without authorization
    if (!isLoggedIn) {
        return <p className="p-4 text-red-600">You need to be authorized</p>
    }

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cookingTime, setCookingTime] = useState<number>(NaN)
    const [ingredients, setIngredients] = useState([''])

    const handleIngredientChange = (value: string, index: number) => {
        const updated = [...ingredients]
        updated[index] = value
        setIngredients(updated)
    }

    const addIngredientField = () => {
        setIngredients([...ingredients, ''])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !description || cookingTime <= 0 || ingredients.some(i => !i)) {
            toast.error('Please fill all fields correctly')
            return
        }

        const data: CreateRecipeDto = {
            title,
            description,
            cookingTime,
            ingredients,
        }

        try {
            await api.post('/recipes', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success('You successfully added new recipe')
            setTimeout(() => window.location.href = '/', 1000)
        } catch (err) {
            toast.error('Error while adding new recipe')
        }
    }

    return (
      <form onSubmit={handleSubmit} className="p-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add recipe</h2>

          <input
            className="w-full mb-2 border p-2"
            placeholder="Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full mb-2 border p-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Cooking time (min)</p>
          <input
            type="number"
            className="w-full mb-2 border p-2"
            placeholder="Cooking time (min)"
            value={cookingTime}
            onChange={(e) => setCookingTime(+e.target.value)}
          />

          <div className="mb-2">
              <label className="block font-medium mb-1">Ingredients:</label>
              {ingredients.map((ing, idx) => (
                <input
                  key={idx}
                  className="w-full mb-1 border p-2"
                  placeholder={`Ingredient #${idx + 1}`}
                  value={ing}
                  onChange={(e) => handleIngredientChange(e.target.value, idx)}
                />
              ))}
              <button type="button" className="text-blue-600 mt-1" onClick={addIngredientField}>
                  + Add ingredient
              </button>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
              Add recipe
          </button>
      </form>
    )
}
