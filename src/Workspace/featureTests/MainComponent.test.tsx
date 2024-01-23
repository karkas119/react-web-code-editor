import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { MainComponent } from '../components/MainComponent/MainComponent';

jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-code-editor" />
}));

describe('<MainComponent />', () => {
  it('should render only root folder of the file structure', () => {
    render(<MainComponent />);

    expect(screen.getByText('app')).toBeInTheDocument();
    expect(screen.queryByText('data')).not.toBeInTheDocument();
  });

  it('should expand root folder of the file structure when clicked', async () => {
    render(<MainComponent />);
    const rootFolder = screen.getByText('app');

    await userEvent.click(rootFolder);

    expect(screen.getByText('data')).toBeInTheDocument();
    expect(screen.getByText('src')).toBeInTheDocument();
    expect(screen.getByText('index.html')).toBeInTheDocument();
  });

  it('should hide nested folders and files when root folder of the file structure is clicked two times', async () => {
    render(<MainComponent />);
    const rootFolder = screen.getByText('app');

    await userEvent.click(rootFolder);
    await userEvent.click(rootFolder);


    expect(screen.queryByText('data')).not.toBeInTheDocument();
    expect(screen.queryByText('src')).not.toBeInTheDocument();
    expect(screen.queryByText('index.html')).not.toBeInTheDocument();
  });

  it('should open code editor when some file is clicked', async () => {
    render(<MainComponent />);
    const rootFolder = screen.getByText('app');

    await userEvent.click(rootFolder);

    const file = screen.getByText('index.html');

    await userEvent.click(file);

    expect(screen.getByTestId('mocked-code-editor')).toBeInTheDocument();
  });

  it('should not open code editor when some folder is clicked', async () => {
    render(<MainComponent />);
    const rootFolder = screen.getByText('app');

    await userEvent.click(rootFolder);

    const file = screen.getByText('src');

    await userEvent.click(file);

    expect(screen.queryByTestId('mocked-code-editor')).not.toBeInTheDocument();
  });
});
