/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL: string;
  readonly VITE_PHONE: string;
  readonly VITE_GITHUB_URL: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_LOCATION: string;
  readonly VITE_CV_URL: string;
  readonly VITE_BASE_PATH: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
