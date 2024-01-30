import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin()],
})
