export default {
  apiNinjasApiKey: import.meta.env.VITE_API_NINJAS_KEY ?? '',
  baseUrl: import.meta.env.DEV ? 'http://localhost:8000' : ''
} as const;
