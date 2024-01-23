import { arrayToDirectoryTree } from './createFileStructure';
import { expect } from '@jest/globals';

describe('arrayToDirectoryTree', () => {
  test('should handle edge cases, such as empty array, null and undefined', () => {
    let res = arrayToDirectoryTree([]);

    expect(res).toStrictEqual({});

    res = arrayToDirectoryTree();

    expect(res).toStrictEqual({});

    res = arrayToDirectoryTree(null);

    expect(res).toStrictEqual({});
  });

  test('should return a sorted file structure based on provided argument', () => {
    const testFiles = [
      { path: 'app/src/TestApp.tsx', contents: 'testContent1' },
      { path: 'app/data/TestApp2.tsx', contents: 'testContent2' },
      { path: 'app/data/TestFolder/TestApp3.js', contents: 'testContent3' },
      { path: 'app/TestApp4.js', contents: 'testContent4' }
    ];
    const expectedResult = {
      name: 'app',
      isFolder: true,
      children: [
        {
          name: 'data',
          isFolder: true,
          children: [
            {
              name: 'TestFolder',
              isFolder: true,
              children: [
                {
                  name: 'TestApp3.js',
                  isFolder: false,
                  contents: 'testContent3',
                  children: []
                }
              ]
            },
            {
              name: 'TestApp2.tsx',
              isFolder: false,
              children: [],
              contents: 'testContent2'
            }
          ]
        },
        {
          name: 'src',
          isFolder: true,
          children: [
            {
              name: 'TestApp.tsx',
              isFolder: false,
              contents: 'testContent1',
              children: []
            }
          ]
        },
        {
          name: 'TestApp4.js',
          isFolder: false,
          children: [],
          contents: 'testContent4'
        }
      ]
    };

    const result = arrayToDirectoryTree(testFiles);

    expect(result).toStrictEqual(expectedResult);
  });
});
