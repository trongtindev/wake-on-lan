// plugins/vuetify.js
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { VSkeletonLoader } from 'vuetify/labs/components';
import { md2 } from 'vuetify/blueprints';
import { en, vi } from 'vuetify/locale';

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		ssr: false,
		components: {
			VSkeletonLoader
		},
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: {
				mdi
			}
		},
		locale: {
			locale: 'en',
			fallback: 'en',
			messages: { en, vi }
		},
		blueprint: md2
	});

	nuxtApp.vueApp.use(vuetify);
});
