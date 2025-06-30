import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import type { OutputRecipeDto } from '../types/recipe'

export function useRecipes(filters: {
  search?: string
  maxCookingTime?: number
  minIngredients?: number
}) {
  const token = localStorage.getItem('token')

  return useInfiniteQuery({
    queryKey: ['recipes', filters],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await api.get<OutputRecipeDto[]>('/recipes', {
        params: {
          ...filters,
          page: pageParam,
          limit: 10,
        },
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined,
      })
      return response.data
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length + 1,
  })
}
