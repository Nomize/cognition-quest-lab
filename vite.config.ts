import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://qhbroauusanobomvcehr.supabase.co'),
    'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoYnJvYXV1c2Fub2JvbXZjZWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTc3MDUsImV4cCI6MjA3NzQ5MzcwNX0.IZuQWP7upLqEODwm8n_J3j-NlbhKR1F2iUC2WtQWs9Y'),
    'import.meta.env.VITE_SUPABASE_PROJECT_ID': JSON.stringify('qhbroauusanobomvcehr'),
  },
}));