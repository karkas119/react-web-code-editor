export type FileNodeType = {
  name: string;
  isFolder: boolean;
  contents: string;
};

export type FolderNodeType = {
  children?: (FileNodeType | FolderNodeType)[];
} & FileNodeType;

export type FileType = {
  path: string;
  contents: string;
};
