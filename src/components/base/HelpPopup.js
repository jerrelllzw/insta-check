import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Flex,
	Text,
} from '@chakra-ui/react';
import { BRAND_GRADIENT } from '../../theme';

const STEPS = [
	'Open Instagram settings and access Accounts Center',
	'Navigate to "Your information and permissions"',
	'Select "Download your information" and click "Download or transfer information"',
	'Choose "Some of your information"',
	'Check the box for "Followers and following" under the Connections section',
	'Click "Next"',
	'Choose "Download to device" and proceed',
	'For "Date range", select "All time" and for "Format", select "JSON"',
	'Click "Create files" to request your data',
	'Wait for Instagram to notify you when your data is ready, then download the files',
];

const HelpPopup = (props) => {
	const { onClose, isOpen } = props;

	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior='inside'>
			<ModalOverlay backdropFilter='blur(6px)' bg='blackAlpha.600' />
			<ModalContent
				bg='surface.800'
				color='ink.100'
				borderRadius='2xl'
				border='1px solid'
				borderColor='whiteAlpha.100'
				mx={4}
			>
				<ModalHeader fontSize='xl'>How to get your data 😏</ModalHeader>
				<ModalCloseButton borderRadius='full' />
				<ModalBody>
					<Flex flexDirection='column' gap={3}>
						{STEPS.map((step, index) => (
							<Flex key={index} align='flex-start' gap={3}>
								<Flex
									flexShrink={0}
									align='center'
									justify='center'
									boxSize='1.6em'
									mt='1px'
									borderRadius='full'
									bgImage={BRAND_GRADIENT}
									color='white'
									fontSize='sm'
									fontWeight='700'
								>
									{index + 1}
								</Flex>
								<Text color='ink.300' lineHeight='1.5'>{step}</Text>
							</Flex>
						))}
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} variant='brand'>
						Got it
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default HelpPopup;
