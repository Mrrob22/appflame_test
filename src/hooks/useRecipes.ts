import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import type { OutputRecipeDto } from '../types/recipe'

// const PAGE_SIZE = 10

export function useRecipes(filters: {
  search?: string
  maxCookingTime?: number
  minIngredients?: number
}) {
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
      })
      return response.data
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length + 1,
  })
}

