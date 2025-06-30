import {
    // RouterProvider,
    createRouter,
    createRootRoute,
    createRoute, Outlet,
} from '@tanstack/react-router'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AddRecipePage from '../pages/AddRecipePage'
import React from 'react'
import Navbar from "../components/Navbar.tsx";
import RecipePage from '../pages/RecipePage.tsx';

const rootRoute = createRootRoute({
    component: () => (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
})

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
})

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: RegisterPage,
})

const addRecipeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/add-recipe',
    component: AddRecipePage,
})

export const recipeDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/recipes/$recipeId',
    component: RecipePage,
})

const routeTree = rootRoute.addChildren([
    homeRoute,
    loginRoute,
    registerRoute,
    addRecipeRoute,
    recipeDetailRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
