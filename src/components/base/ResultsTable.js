import React from 'react';
import {
	Table,
	Tbody,
	Tr,
	Td,
	TableContainer,
	Link,
	Thead,
	Th,
	Text,
	Flex,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const ResultsTable = (props) => {
	const { results } = props;

	if (results.length === 0) {
		return (
			<Flex
				width='100%'
				minHeight='10em'
				align='center'
				justify='center'
				borderRadius='2xl'
				border='1px dashed'
				borderColor='whiteAlpha.200'
				bg='whiteAlpha.50'
			>
				<Text color='ink.300' textAlign='center'>
					Nothing to show here 🎉
				</Text>
			</Flex>
		);
	}

	return (
		<TableContainer
			width='100%'
			overflowY='auto'
			maxHeight='40vh'
			borderRadius='2xl'
			border='1px solid'
			borderColor='whiteAlpha.150'
			bg='rgba(44, 51, 63, 0.6)'
			backdropFilter='blur(8px)'
			boxShadow='0 12px 32px -16px rgba(0, 0, 0, 0.7)'
		>
			<Table variant='simple' size='sm'>
				<Thead position='sticky' top='0' zIndex={1} bg='surface.600'>
					<Tr>
						<Th color='ink.300' borderColor='whiteAlpha.200'>#</Th>
						<Th color='ink.300' borderColor='whiteAlpha.200'>Account</Th>
					</Tr>
				</Thead>
				<Tbody>
					{results.map((result, index) => (
						<Tr
							key={`${result}-${index}`}
							transition='background 0.15s ease'
							_hover={{ bg: 'whiteAlpha.100' }}
						>
							<Td color='ink.500' borderColor='whiteAlpha.100'>{index + 1}</Td>
							<Td borderColor='whiteAlpha.100'>
								<Link
									href={'https://www.instagram.com/' + result}
									isExternal
									color='ink.100'
									fontWeight='500'
									_hover={{ color: '#d62976' }}
								>
									{result}
									<ExternalLinkIcon mx='2px' mb='3px' />
								</Link>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default ResultsTable;
