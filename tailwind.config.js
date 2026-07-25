/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					blue: "#0057B7",
					yellow: "#FFD700",
				},
			},
			fontFamily: {
				mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
			},
			animation: {
				"fade-in-up": "fadeInSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"pulse-slow": "pulseSlow 10s infinite ease-in-out",
			},
			keyframes: {
				fadeInSlideUp: {
					from: { opacity: 0, transform: "translateY(16px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				pulseSlow: {
					"0%, 100%": { transform: "scale(1)", opacity: 0.1 },
					"50%": { transform: "scale(1.1)", opacity: 0.15 },
				},
			},
		},
	},
	plugins: [],
};
