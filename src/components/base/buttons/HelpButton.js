import React from 'react';
import { Button } from '@chakra-ui/react';

const HelpButton = (props) => {
	const { onOpen } = props;

	return (
		<Button onClick={onOpen} variant='ghostLight' size='sm'>
			Need Help?
		</Button>
	);
};

export default HelpButton;
