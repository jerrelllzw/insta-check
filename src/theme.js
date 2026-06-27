import { extendTheme } from '@chakra-ui/react';

// Instagram-inspired gradient used throughout the app for brand accents.
export const BRAND_GRADIENT =
	'linear-gradient(135deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)';

const theme = extendTheme({
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false,
	},
	fonts: {
		heading: `'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
		body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
	},
	colors: {
		surface: {
			900: '#15181f',
			800: '#1b1f27',
			700: '#222831',
			600: '#2c333f',
			500: '#393E46',
		},
		ink: {
			100: '#EEEEEE',
			300: '#b9bfc9',
			500: '#8a93a3',
		},
	},
	styles: {
		global: {
			'html, body, #root': {
				minHeight: '100%',
			},
			body: {
				bg: 'surface.700',
				color: 'ink.100',
			},
			// Subtle, slim scrollbars that match the dark surfaces.
			'*::-webkit-scrollbar': {
				width: '8px',
				height: '8px',
			},
			'*::-webkit-scrollbar-track': {
				background: 'transparent',
			},
			'*::-webkit-scrollbar-thumb': {
				background: 'rgba(238, 238, 238, 0.18)',
				borderRadius: '8px',
			},
			'*::-webkit-scrollbar-thumb:hover': {
				background: 'rgba(238, 238, 238, 0.32)',
			},
		},
	},
	components: {
		Button: {
			baseStyle: {
				fontWeight: '600',
				borderRadius: 'xl',
			},
			variants: {
				brand: {
					color: 'white',
					bgImage: BRAND_GRADIENT,
					bgSize: '200% 200%',
					bgPos: '0% 50%',
					boxShadow: '0 8px 24px -8px rgba(214, 41, 118, 0.6)',
					transition: 'all 0.25s ease',
					_hover: {
						bgPos: '100% 50%',
						transform: 'translateY(-2px)',
						boxShadow: '0 12px 30px -8px rgba(214, 41, 118, 0.75)',
						_disabled: {
							transform: 'none',
						},
					},
					_active: {
						transform: 'translateY(0)',
					},
				},
				ghostLight: {
					color: 'ink.100',
					bg: 'whiteAlpha.100',
					borderRadius: 'xl',
					transition: 'all 0.2s ease',
					_hover: {
						bg: 'whiteAlpha.200',
						transform: 'translateY(-1px)',
					},
				},
			},
		},
	},
});

export default theme;
