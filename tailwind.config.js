module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			"backgroundColor": {
				"bg-custom1": "#28283e"
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
