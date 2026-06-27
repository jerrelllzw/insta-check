import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import HelpButton from '../base/buttons/HelpButton';

const Header = (props) => {
	const { onOpen } = props;

	return (
		<Flex alignItems='center' padding='2em'>
			<Flex style={{ marginRight: 'auto' }}>
				<Heading color='#c1558b'>Insta</Heading>
				<Heading color='#8a49a1'>Check</Heading>
			</Flex>

			<HelpButton onOpen={onOpen}/>
		</Flex>
	);
};

export default Header;
