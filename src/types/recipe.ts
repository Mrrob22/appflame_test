export interface CreateRecipeDto {
  title: string
  description: string
  cookingTime: number
  ingredients: string[]
}

export interface OutputRecipeDto {
  id: number
  title: string
  description: string
  cookingTime: number
  ingredients: string[]
  likeCount: number
  isLiked: boolean
}