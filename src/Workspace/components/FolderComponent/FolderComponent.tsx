import React from 'react';
import { Box } from '@mui/material';

import { FolderNodeType } from '../../../defaultFiles/types';
import { MemoizedFileComponent } from '../FileComponent/FileComponent';
import { iconsMapping } from '../../../constants/iconsMapping';
import { useExpandingToggle } from '../../shared/useToggleVisibility';

import './styles.css';

interface FolderComponentProps {
  folderInfo: FolderNodeType;
  currentFile: string;
  handleFileSelect: (fileName: string, contents: string) => void;
}

export const FolderComponent = ({
  folderInfo,
  handleFileSelect,
  currentFile
}: FolderComponentProps) => {
  const { isExpanded, handleExpandClick } = useExpandingToggle();

  return (
    <Box className="folder-wrapper">
      {folderInfo.isFolder ? (
        <>
          <Box className="arrow-wrapper" onClick={handleExpandClick}>
            {isExpanded ? iconsMapping.arrowDown : iconsMapping.arrowRight}
            <Box>{folderInfo.name}</Box>
          </Box>

          {isExpanded
            ? folderInfo.children.map((item: FolderNodeType) => (
                <FolderComponent
                  key={item.name}
                  folderInfo={item}
                  handleFileSelect={handleFileSelect}
                  currentFile={currentFile}
                />
              ))
            : null}
        </>
      ) : (
        <MemoizedFileComponent
          key={folderInfo.name}
          name={folderInfo.name}
          contents={folderInfo.contents}
          handleFileSelect={handleFileSelect}
          currentFile={currentFile}
        />
      )}
    </Box>
  );
};
