// src/services/openapi/client.ts

import { Configuration } from "./configuration";
import { DefaultApi } from "./api";      // sau cum se numește în fișierele tale

// 1) Construiește configurația cu URL-ul backend-ului
const config = new Configuration({
  basePath: import.meta.env.VITE_API_URL || "http://localhost:8080"
});

// 2) Instanțiază un client
export const apiClient = new DefaultApi(config);
