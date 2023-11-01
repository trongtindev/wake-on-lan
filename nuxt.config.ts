import vuetify from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	srcDir: 'src/',
	logLevel: process.env.NODE_ENV !== 'development' ? 'info' : 'verbose',
	app: {
		head: {
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
			],
			link: [
				{
					href: 'https://fonts.googleapis.com',
					rel: 'preconnect'
				},
				{
					href: 'https://fonts.gstatic.com',
					rel: 'preconnect',
					crossorigin: ''
				},
				{
					href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap',
					rel: 'stylesheet'
				}
			]
		}
	},
	css: [
		'vuetify/lib/styles/main.sass',
		'@/assets/main.css'
	],
	build: {
		transpile: ['vuetify']
	},
	modules: [
		'@vueuse/nuxt',
		'@pinia/nuxt',
		async (options: any, nuxt: any) => {
			nuxt.hooks.hook('vite:extendConfig', (config: any) =>
				config.plugins.push(vuetify({ autoImport: true }))
			);
		}
	]
});
