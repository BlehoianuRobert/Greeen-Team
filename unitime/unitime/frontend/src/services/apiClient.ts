// src/services/apiClient.ts
import { Configuration, DefaultApi } from './openapi';

// point at your backend, then append the OpenAPI “servers” path (/api)
const config = new Configuration({
  basePath: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// this is the object you call everywhere
export const api = new DefaultApi(config);
