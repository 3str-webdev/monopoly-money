import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
	base: "/monopoly-money/",
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	plugins: [react()],
});
