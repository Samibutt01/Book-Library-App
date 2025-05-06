// src/__tests__/Books.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Books from '../Books';

// Mock API configuration
jest.mock('../../utils/api', () => ({
  __esModule: true,
  default: {
    append: jest.fn(),
    get: jest.fn(),
    has: jest.fn()
  },
  API_URL: 'http://127.0.0.1:8000/api/v1/'
}));

// Mock icons
jest.mock('@heroicons/react/24/outline', () => ({
  PencilSquareIcon: () => <span data-testid="edit-icon">Edit</span>,
  TrashIcon: () => <span data-testid="delete-icon">Delete</span>,
  PlusIcon: () => <span data-testid="plus-icon">+</span>,
  EyeIcon: () => <span data-testid="view-icon">View</span>
}));

// Mock Spinner
jest.mock('../../components/spinner', () => () => <div data-testid="loading-spinner">Loading...</div>);

// Mock fetch
global.fetch = jest.fn();

// Mock window.confirm
window.confirm = jest.fn(() => true);

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

describe('Books Component - CRUD Operations', () => {
  const mockAuthors = [
    { id: 22, name: 'Author 1' },
    { id: 23, name: 'Author 2' }
  ];

  const mockBooks = [
    { id: 22, name: 'Book 1', isbn: '123456', author: { id: 22, name: 'Author 1' } }
  ];

  beforeEach(() => {
    fetch.mockImplementation((url) => {
      if (url.includes('books')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockBooks })
        });
      }
      if (url.includes('authors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockAuthors })
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderBooks = () => {
    return render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );
  };

  test('1. Creates a new book', async () => {
    renderBooks();
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Find the main "Add Book" button (not the icon)
    const addBookButtons = screen.getAllByRole('button', { name: /Add Book/i });
    // Select the first one (the main button, not action buttons in table)
    const mainAddButton = addBookButtons[0];
    
    // Open add modal
    fireEvent.click(mainAddButton);
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Book Title'), { 
      target: { value: 'New Book' } 
    });
    fireEvent.change(screen.getByLabelText('ISBN'), { 
      target: { value: '111222' } 
    });
    fireEvent.change(screen.getByLabelText('Author'), { 
      target: { value: '22' } 
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Add Book/i }));
    
    // Verify API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/v1/books',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'New Book',
            isbn: '111222',
            author_id: '22'
          })
        })
      );
    });
  });

  test('2. Reads book data', async () => {
    renderBooks();
    
    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('123456')).toBeInTheDocument();
      expect(screen.getByText('Author 1')).toBeInTheDocument();
    });
  });

  test('3. Updates a book', async () => {
    renderBooks();
    
    await waitFor(() => {
      expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
    });

    // Click edit button
    fireEvent.click(screen.getByTestId('edit-icon'));
    
    // Verify form populated
    await waitFor(() => {
      expect(screen.getByDisplayValue('Book 1')).toBeInTheDocument();
    });
    
    // Update fields
    fireEvent.change(screen.getByLabelText('Book Title'), { 
      target: { value: 'Updated Book' } 
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Update Book/i }));
    
    // Verify API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/v1/books/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({
            name: 'Updated Book',
            isbn: '123456',
            author_id: '22'
          })
        })
      );
    });
  });

  test('4. Deletes a book', async () => {
    renderBooks();
    
    await waitFor(() => {
      expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
    });

    // Click delete button
    fireEvent.click(screen.getByTestId('delete-icon'));
    
    // Verify confirmation and API call
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/v1/books/22',
        expect.objectContaining({
          method: 'DELETE'
        })
      );
    });
  });
});