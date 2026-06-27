import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
	return (
		<Flex
			as='footer'
			justifyContent='center'
			alignItems='center'
			gap={1}
			px='2em'
			py='1.5em'
			color='ink.500'
			fontSize='sm'
		>
			<Text>Runs entirely in your browser ·</Text>
			<Link
				href='https://github.com/jerrelllzw/insta-check'
				isExternal
				_hover={{ color: 'ink.300' }}
			>
				Open source
			</Link>
		</Flex>
	);
};

export default Footer;
