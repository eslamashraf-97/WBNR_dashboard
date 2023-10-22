import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// server: {
// 	watch: {
// 		usePolling: true,
// 	},
// 	host: !!env.APP_HOST || true, // needed for the Docker Container port mapping to work
// 		strictPort: true,
// 		port: Number(env.APP_PORT) || 90, // you can replace this port with any port
// },
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [vue()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
			},
		},

	};
})
