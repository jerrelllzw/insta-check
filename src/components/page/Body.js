import React, { useState } from 'react';
import { Flex, Heading, Text, Badge, keyframes } from '@chakra-ui/react';
import JsonInput from '../base/JsonInput';
import SubmitButton from '../base/buttons/SubmitButton';
import BackButton from '../base/buttons/BackButton';
import ResultsTable from '../base/ResultsTable';
import {
	FOLLOWERS_FILENAME,
	FOLLOWINGS_FILENAME,
} from '../../common/Constants';
import HelpPopup from '../base/HelpPopup';

const fadeInUp = keyframes`
	from { opacity: 0; transform: translateY(16px); }
	to { opacity: 1; transform: translateY(0); }
`;

const Body = (props) => {
	const { isOpen, onClose } = props;

	const [followersFile, setFollowersFile] = useState([]);
	const [followingsFile, setFollowingsFile] = useState([]);
	const [happyResults, setHappyResults] = useState([]);
	const [sadResults, setSadResults] = useState([]);
	const [showResults, setShowResults] = useState(false);

	const animation = `${fadeInUp} 0.5s ease both`;

	return (
		<>
			<HelpPopup onClose={onClose} isOpen={isOpen} />
			<Flex
				as='main'
				flexDirection='column'
				alignItems='center'
				flex='1'
				gap={8}
				px={{ base: '1.25em', md: '2em' }}
				py={{ base: '2.5em', md: '4em' }}
			>
				{!showResults && (
					<>
						<Flex flexDirection='column' alignItems='center' gap={3} animation={animation}>
							<Heading
								size={{ base: '2xl', md: '3xl' }}
								color='ink.100'
								textAlign='center'
								letterSpacing='-0.02em'
							>
								See who isn't following back
							</Heading>
							<Text color='ink.300' fontSize={{ base: 'md', md: 'lg' }} textAlign='center' maxW='32em'>
								Upload your Instagram data export below. Everything runs in your
								browser — no login, no data collected.
							</Text>
						</Flex>
						<Flex
							gap={6}
							justifyContent='center'
							alignItems='stretch'
							flexDirection={{ base: 'column', md: 'row' }}
							animation={animation}
							sx={{ animationDelay: '0.1s' }}
						>
							<JsonInput
								files={followersFile}
								setFiles={setFollowersFile}
								label={FOLLOWERS_FILENAME}
							/>
							<JsonInput
								files={followingsFile}
								setFiles={setFollowingsFile}
								label={FOLLOWINGS_FILENAME}
							/>
						</Flex>
						<Flex animation={animation} sx={{ animationDelay: '0.2s' }}>
							<SubmitButton
								followersFile={followersFile ? followersFile[0] : null}
								followingsFile={followingsFile ? followingsFile[0] : null}
								setHappyResults={setHappyResults}
								setSadResults={setSadResults}
								setShowResults={setShowResults}
							/>
						</Flex>
					</>
				)}
				{showResults && (
					<>
						<Heading
							size={{ base: '2xl', md: '3xl' }}
							color='ink.100'
							animation={animation}
							letterSpacing='-0.02em'
						>
							Results
						</Heading>
						<Flex
							justifyContent='center'
							alignItems='flex-start'
							gap={8}
							flexDirection={{ base: 'column', md: 'row' }}
							width='100%'
							maxW='52em'
							animation={animation}
							sx={{ animationDelay: '0.1s' }}
						>
							<Flex flexDirection='column' alignItems='center' gap={4} flex='1' width='100%'>
								<Flex align='center' gap={2}>
									<Heading color='ink.100' size='md'>
										Mutually following 🙂
									</Heading>
									<Badge colorScheme='green' borderRadius='full' px={2.5} py={0.5}>
										{happyResults.length}
									</Badge>
								</Flex>
								<ResultsTable results={happyResults} />
							</Flex>
							<Flex flexDirection='column' alignItems='center' gap={4} flex='1' width='100%'>
								<Flex align='center' gap={2}>
									<Heading color='ink.100' size='md'>
										Not following back ☹️
									</Heading>
									<Badge colorScheme='pink' borderRadius='full' px={2.5} py={0.5}>
										{sadResults.length}
									</Badge>
								</Flex>
								<ResultsTable results={sadResults} />
							</Flex>
						</Flex>
						<Flex animation={animation} sx={{ animationDelay: '0.2s' }}>
							<BackButton
								setFollowersFile={setFollowersFile}
								setFollowingsFile={setFollowingsFile}
								setShowResults={setShowResults}
							/>
						</Flex>
					</>
				)}
			</Flex>
		</>
	);
};

export default Body;
