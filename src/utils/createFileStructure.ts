import { FileType, FolderNodeType } from '../defaultFiles/types';

const sortChildren = (children: FolderNodeType[]) => {
  children.sort((a, b) => {
    if (a.isFolder && !b.isFolder) {
      return -1;
    } else if (!a.isFolder && b.isFolder) {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });
  for (const child of children) {
    if (child.isFolder) {
      sortChildren(child.children);
    }
  }
};

export const arrayToDirectoryTree = (arr: FileType[] = []): FolderNodeType => {
  if (!arr) return {} as FolderNodeType;

  const root = { name: '', isFolder: true, children: [], contents: '' };
  const map = { '': root };
  for (const file of arr) {
    const segments = file.path.split('/');
    let current = root;
    let currentPath = '';
    for (const segment of segments) {
      currentPath += `${segment}/`;
      if (!map[currentPath]) {
        const node = { name: segment, isFolder: true, children: [] };
        map[currentPath] = node;
        current.children.push(node);
      }
      current = map[currentPath];
    }
    current.isFolder = false;
    current.contents = file.contents;
  }

  sortChildren(root.children);

  return root.children[0] ?? {};
};
