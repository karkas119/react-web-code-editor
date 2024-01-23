import React, { memo } from 'react';
import { Box } from '@mui/material';

import './styles.css';

interface FileProps {
  name: string;
  contents: string;
  currentFile: string;
  handleFileSelect: (fileName: string, contents: string) => void;
}

const FileComponent = ({
  name,
  contents,
  currentFile,
  handleFileSelect
}: FileProps) => {
  return (
    <Box className={`file-wrapper ${currentFile === name ? 'selected' : null}`}>
      <div onClick={() => handleFileSelect(name, contents)}>{name}</div>
    </Box>
  );
};

export const MemoizedFileComponent = memo(FileComponent);
