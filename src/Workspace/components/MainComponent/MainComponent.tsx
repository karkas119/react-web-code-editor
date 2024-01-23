import React from 'react';
import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';

import { FolderComponent } from '../FolderComponent/FolderComponent';
import { useMainComponent } from './hooks';

import './styles.css';

export const MainComponent = () => {
  const {
    directoryTree,
    selectedFiles,
    currentFile,
    handleFileSelect,
    handleEditorChange
  } = useMainComponent();

  return (
    <Box className="main-wrapper">
      <FolderComponent
        key={directoryTree.name}
        folderInfo={directoryTree}
        handleFileSelect={handleFileSelect}
        currentFile={currentFile}
      />
      {currentFile && (
        <Editor
          key={currentFile}
          width="85%"
          height="85vh"
          defaultValue={selectedFiles[currentFile]}
          onChange={handleEditorChange}
          defaultLanguage="typescript"
        />
      )}
    </Box>
  );
};
