export default {
  apiNinjasApiKey: import.meta.env.VITE_API_NINJAS_KEY ?? '',
  baseUrl: import.meta.env.DEV ? 'http://192.168.1.107:8000' : ''
} as const;
