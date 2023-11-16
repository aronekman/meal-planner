export default {
  apiNinjasApiKey: import.meta.env.VITE_API_NINJAS_KEY ?? '',
  baseUrl: import.meta.env.DEV ? 'http://127.0.0.1:8000' : ''
} as const;
