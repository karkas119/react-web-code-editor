import { useCallback, useMemo, useState } from 'react';
import defaultFiles from '../../../defaultFiles/defaultFiles';
import { arrayToDirectoryTree } from '../../../utils/createFileStructure';

export const useMainComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState<Record<string, string>>(
    {}
  );
  const [currentFile, setCurrentFile] = useState('');

  const handleFileSelect = useCallback((fileName, contents) => {
    //useCallback is used because this callback will be passed as prop to React.memo() component
    setSelectedFiles(prevValue => {
      if (prevValue[fileName]) {
        return prevValue;
      }

      return { ...prevValue, [fileName]: contents };
    });
    setCurrentFile(fileName);
  }, []);

  const handleEditorChange = (value: string) => {
    setSelectedFiles(prevValue => ({ ...prevValue, [currentFile]: value }));
  };

  const directoryTree = useMemo(
    () => arrayToDirectoryTree(defaultFiles),
    [defaultFiles]
  );

  return {
    directoryTree,
    selectedFiles,
    currentFile,
    handleFileSelect,
    handleEditorChange
  };
};
