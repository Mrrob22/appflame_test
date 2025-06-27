/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECIPES_URL: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

