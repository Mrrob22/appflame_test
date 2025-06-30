import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import type { OutputRecipeDto } from '../types/recipe'

const PAGE_SIZE = 10

export function useRecipes() {
  return useInfiniteQuery({
    queryKey: ['recipes'],
    initialPageParam: 1, // ✅ добавили вот это
    queryFn: async ({ pageParam }) => {
      const response = await api.get<OutputRecipeDto[]>('/recipes', {
        params: { page: pageParam, limit: PAGE_SIZE },
      })
      return response.data
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined
      return allPages.length + 1
    },
  })
}
