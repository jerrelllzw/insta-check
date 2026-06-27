import React from 'react';
import { Button } from '@chakra-ui/react';
import { readJson } from '../../../common/FileUtils';
import {
	FOLLOWERS_FILENAME,
	FOLLOWINGS_FILENAME,
	INVALID_FOLLOWERS_FILE_MESSAGE,
	INVALID_FOLLOWINGS_FILE_MESSAGE,
	INVALID_JSON_FILE_MESSAGE,
	SUCCESS_MESSAGE,
} from '../../../common/Constants';
import { useToastUtils } from '../../../common/ToastUtils';

const SubmitButton = (props) => {
	const {
		followersFile,
		followingsFile,
		setHappyResults,
		setSadResults,
		setShowResults,
	} = props;

	const toast = useToastUtils();

	const validateFiles = () => {
		if (!followersFile || followersFile.name !== FOLLOWERS_FILENAME) {
			toast(INVALID_FOLLOWERS_FILE_MESSAGE, 'error');
			return false;
		}
		if (!followingsFile || followingsFile.name !== FOLLOWINGS_FILENAME) {
			toast(INVALID_FOLLOWINGS_FILE_MESSAGE, 'error');
			return false;
		}
		return true;
	};

	const handleOnClick = async () => {
		if (validateFiles()) {
			try {
				const [followersData, followingData] = await Promise.all([
					readJson(followersFile.file),
					readJson(followingsFile.file),
				]);

				const followers = followersData.map(
					(follower) => follower.string_list_data[0].value
				);
				const following = followingData.relationships_following.map(
					(following) => following.title
				);

				const mutualFollowing = following.filter((user) =>
					followers.includes(user)
				);
				const notFollowingBack = following.filter(
					(user) => !followers.includes(user)
				);

				setHappyResults(mutualFollowing);
				setSadResults(notFollowingBack);
				setShowResults(true);
				toast(SUCCESS_MESSAGE, 'success');
			} catch (error) {
				toast(INVALID_JSON_FILE_MESSAGE, 'error');
			}
		}
	};

	return (
		<Button colorScheme='teal' onClick={handleOnClick} style={{ marginBottom: '3em' }}>
			Get Results
		</Button>
	);
};

export default SubmitButton;
