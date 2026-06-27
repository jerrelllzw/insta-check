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
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const ResultsTable = (props) => {
	const { results } = props;

	if (results.length === 0) {
		return (
			<Text color='#EEEEEE' minWidth='13em' textAlign='center'>
				Nothing to show here 🎉
			</Text>
		);
	}

	return (
		<TableContainer
			overflowY='scroll'
			maxHeight='30vh'
			border='1px solid #EEEEEE'
			borderRadius='md'
			minWidth='13em'
		>
			<Table variant='simple'>
				<Thead>
					<Tr>
						<Th color='#EEEEEE'>Index</Th>
						<Th color='#EEEEEE'>Account</Th>
					</Tr>
				</Thead>
				<Tbody>
					{results.map((result, index) => (
						<Tr key={`${result}-${index}`} color='#EEEEEE'>
							<Td>{index + 1}</Td>
							<Td>
								<Link href={'https://www.instagram.com/' + result} isExternal>
									{result}
									<ExternalLinkIcon mx='2px' />
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
