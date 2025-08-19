import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'space': ['Space Grotesk', 'sans-serif'],
			},
			colors: {
				// Dark theme colors
				dark: {
					bg: 'hsl(var(--dark-bg))',
					card: 'hsl(var(--dark-card))',
					border: 'hsl(var(--dark-border))',
					text: 'hsl(var(--dark-text))',
					muted: 'hsl(var(--dark-muted))',
				},
				// Vibrant accent colors
				electric: {
					50: 'hsl(var(--electric-50))',
					100: 'hsl(var(--electric-100))',
					200: 'hsl(var(--electric-200))',
					300: 'hsl(var(--electric-300))',
					400: 'hsl(var(--electric-400))',
					500: 'hsl(var(--electric-500))',
					600: 'hsl(var(--electric-600))',
					700: 'hsl(var(--electric-700))',
					800: 'hsl(var(--electric-800))',
					900: 'hsl(var(--electric-900))',
				},
				neon: {
					50: 'hsl(var(--neon-50))',
					100: 'hsl(var(--neon-100))',
					200: 'hsl(var(--neon-200))',
					300: 'hsl(var(--neon-300))',
					400: 'hsl(var(--neon-400))',
					500: 'hsl(var(--neon-500))',
					600: 'hsl(var(--neon-600))',
					700: 'hsl(var(--neon-700))',
					800: 'hsl(var(--neon-800))',
					900: 'hsl(var(--neon-900))',
				},
				emerald: {
					50: 'hsl(var(--emerald-50))',
					100: 'hsl(var(--emerald-100))',
					200: 'hsl(var(--emerald-200))',
					300: 'hsl(var(--emerald-300))',
					400: 'hsl(var(--emerald-400))',
					500: 'hsl(var(--emerald-500))',
					600: 'hsl(var(--emerald-600))',
					700: 'hsl(var(--emerald-700))',
					800: 'hsl(var(--emerald-800))',
					900: 'hsl(var(--emerald-900))',
				},
				// Shadcn compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-electric': 'var(--gradient-electric)',
				'gradient-neon': 'var(--gradient-neon)',
				'gradient-emerald': 'var(--gradient-emerald)',
				'gradient-hero': 'var(--gradient-hero)',
			},
			boxShadow: {
				'electric': 'var(--shadow-electric)',
				'neon': 'var(--shadow-neon)',
				'emerald': 'var(--shadow-emerald)',
				'glow': 'var(--shadow-glow)',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--electric-500) / 0.3)',
						transform: 'scale(1)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--electric-500) / 0.5)',
						transform: 'scale(1.02)' 
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-in-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
