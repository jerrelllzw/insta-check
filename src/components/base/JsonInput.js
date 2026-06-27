import React from 'react';
import { Box } from '@chakra-ui/react';
import { Dropzone, FileMosaic } from '@files-ui/react';

const JsonInput = (props) => {
	const { files, setFiles, label } = props;

	const updateFiles = (incomingFiles) => {
		setFiles(incomingFiles);
	};

	const removeFile = (id) => {
		setFiles(files.filter((x) => x.id !== id));
	};

	return (
		<Box
			borderRadius='2xl'
			p='3px'
			bg='whiteAlpha.100'
			transition='all 0.25s ease'
			_hover={{
				bgImage:
					'linear-gradient(135deg, rgba(214, 41, 118, 0.6), rgba(79, 91, 213, 0.6))',
				transform: 'translateY(-3px)',
				boxShadow: '0 16px 40px -16px rgba(0, 0, 0, 0.7)',
			}}
		>
			<Dropzone
				onChange={updateFiles}
				value={files}
				accept='.json'
				maxFiles={1}
				style={{
					width: '15em',
					minHeight: '230px',
					borderRadius: '14px',
					border: '1px dashed rgba(238, 238, 238, 0.25)',
				}}
				label={label}
				color='#EEEEEE'
				background='rgba(44, 51, 63, 0.85)'
				behaviour={'replace'}
			>
				{files.map((file) => (
					<FileMosaic
						key={file.id}
						{...file}
						onDelete={removeFile}
						valid={undefined}
						darkMode={true}
					/>
				))}
			</Dropzone>
		</Box>
	);
};

export default JsonInput;
