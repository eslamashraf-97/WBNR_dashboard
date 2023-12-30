/** @type {im￼port('tailwindcss').Config} */
// import colors from '@/config/colors';

const colors = {
	primary: {
		300: "#05BD6E",
		200: "#A3E8CA",
		100: "#E9F7F1",
	},
	gray: {
		800: "#2C2B3D",
		700: "#464653",
		500: "#8F8F94",
		400: "#95969D",
		300: "#B1B1B5",
		200: "#D8D8DA",
		100: "#F9FAFA",
		50: "#f6f6f6",
	},
	secondary: {
		300: "#EEDC53",
	},
};
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors,
			flexGrow: {
				2: 2,
			},
			borderRadius: {
				main: "10px"
			},
			boxShadow: {
				nav:
					"0px 4px 16px 0px rgba(0, 0, 0, 0.15)",
				aside: "0px 4px 12px 0px rgba(0, 0, 0, 0.12)",
				box: "0px 4px 16px 0px rgba(0, 0, 0, 0.10)"
			},
			fontSize: {
				vsm: "10px"
			}
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				// '2xl': '12rem',
			},
		},
	},
	plugins: [],
};
