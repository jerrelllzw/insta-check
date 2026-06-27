import React from 'react';
import { Heading, Flex, Icon } from '@chakra-ui/react';
import HelpButton from '../base/buttons/HelpButton';
import { BRAND_GRADIENT } from '../../theme';

const InstagramGlyph = (props) => (
	<Icon viewBox='0 0 24 24' {...props}>
		<path
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3Z'
		/>
		<circle cx='12' cy='12' r='3.5' fill='none' stroke='currentColor' strokeWidth='2' />
		<circle cx='17' cy='7' r='1.2' fill='currentColor' />
	</Icon>
);

const Header = (props) => {
	const { onOpen } = props;

	return (
		<Flex
			as='header'
			position='sticky'
			top='0'
			zIndex={10}
			alignItems='center'
			px={{ base: '1.5em', md: '2.5em' }}
			py='1.25em'
			backdropFilter='blur(12px)'
			bg='rgba(27, 31, 39, 0.55)'
			borderBottom='1px solid'
			borderColor='whiteAlpha.100'
		>
			<Flex alignItems='center' gap='3' mr='auto'>
				<Flex
					align='center'
					justify='center'
					boxSize='2.4em'
					borderRadius='xl'
					bgImage={BRAND_GRADIENT}
					boxShadow='0 6px 18px -6px rgba(214, 41, 118, 0.7)'
				>
					<InstagramGlyph boxSize='1.4em' color='white' />
				</Flex>
				<Heading
					as='h1'
					size='lg'
					letterSpacing='-0.02em'
					bgImage={BRAND_GRADIENT}
					bgClip='text'
				>
					InstaCheck
				</Heading>
			</Flex>

			<HelpButton onOpen={onOpen} />
		</Flex>
	);
};

export default Header;
