import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import { autumn as light, dim as dark } from 'daisyui/src/theming/themes'; // Change themes here

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	plugins: [daisyui, typography],

	theme: {
		fontFamily: {
			sans: ['Nunito', 'sans-serif'],
		},
		extend: {},
	},

	daisyui: {
		themes: [{ light, dark }],
	},
	darkMode: ['class', '[data-theme="dark"]'],
} as Config;
