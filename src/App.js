import React from 'react';
import { ChakraProvider, ColorModeScript, useDisclosure, Box, Flex } from '@chakra-ui/react';
import Header from './components/page/Header';
import Body from './components/page/Body';
import Footer from './components/page/Footer';
import theme from './theme';

const App = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<Box position='relative' minHeight='100vh' bg='surface.700' overflow='hidden'>
				{/* Ambient brand-colored glows for depth */}
				<Box
					position='absolute'
					top='-15%'
					left='-10%'
					width='45vw'
					height='45vw'
					bg='radial-gradient(circle, rgba(214, 41, 118, 0.22) 0%, rgba(214, 41, 118, 0) 70%)'
					pointerEvents='none'
					zIndex={0}
				/>
				<Box
					position='absolute'
					bottom='-20%'
					right='-10%'
					width='50vw'
					height='50vw'
					bg='radial-gradient(circle, rgba(79, 91, 213, 0.20) 0%, rgba(79, 91, 213, 0) 70%)'
					pointerEvents='none'
					zIndex={0}
				/>

				<Flex
					position='relative'
					zIndex={1}
					flexDirection='column'
					minHeight='100vh'
				>
					<Header onOpen={onOpen} />
					<Body isOpen={isOpen} onClose={onClose} />
					<Footer />
				</Flex>
			</Box>
		</ChakraProvider>
	);
};

export default App;
