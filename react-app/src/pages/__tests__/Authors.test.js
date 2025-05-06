// src/__tests__/Authors.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Authors from '../Authors';

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

describe('Authors Component - CRUD Operations', () => {
  const mockAuthors = [
    { 
      id: 20, 
      name: 'Author One', 
      gender: 'Male', 
      age: 45, 
      country: 'Canada', 
      genre: 'Science Fiction' 
    }
  ];

  const mockPagination = {
    current_page: 1,
    last_page: 1,
    from: 1,
    to: 1,
    total: 1,
    links: []
  };

  beforeEach(() => {
    fetch.mockImplementation((url) => {
      if (url.includes('authors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ 
            data: mockAuthors,
            meta: mockPagination
          })
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderAuthors = () => {
    return render(
      <MemoryRouter>
        <Authors />
      </MemoryRouter>
    );
  };

  test('1. Creates a new author', async () => {
    renderAuthors();
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Find the main "Add Author" button
    const addAuthorButtons = screen.getAllByRole('button', { name: /Add Author/i });
    const mainAddButton = addAuthorButtons[0];
    
    // Open add modal
    fireEvent.click(mainAddButton);
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Author Name'), { 
      target: { value: 'New Author' } 
    });
    fireEvent.change(screen.getByLabelText('Gender'), { 
      target: { value: 'Female' } 
    });
    fireEvent.change(screen.getByLabelText('Age'), { 
      target: { value: '35' } 
    });
    fireEvent.change(screen.getByLabelText('Country'), { 
      target: { value: 'Japan' } 
    });
    fireEvent.change(screen.getByLabelText('Genre'), { 
      target: { value: 'Fantasy' } 
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Add Author/i }));
    
    // Verify API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/v1/authors',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'New Author',
            gender: 'Female',
            age: '35',
            country: 'Japan',
            genre: 'Fantasy'
          })
        })
      );
    });
  });

  test('2. Reads author data', async () => {
    renderAuthors();
    
    await waitFor(() => {
      expect(screen.getByText('Author One')).toBeInTheDocument();
      expect(screen.getByText('Male')).toBeInTheDocument();
      expect(screen.getByText('45')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
      expect(screen.getByText('Science Fiction')).toBeInTheDocument();
    });
  });

  test('3. Updates an author', async () => {
    renderAuthors();
    
    await waitFor(() => {
      expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
    });

    // Click edit button
    fireEvent.click(screen.getByTestId('edit-icon'));
    
    // Verify form populated
    await waitFor(() => {
      expect(screen.getByDisplayValue('Author One')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Male')).toBeInTheDocument();
      expect(screen.getByDisplayValue('45')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Canada')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Science Fiction')).toBeInTheDocument();
    });
    
    // Update fields
    fireEvent.change(screen.getByLabelText('Author Name'), { 
      target: { value: 'Updated Author' } 
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Update Author/i }));
    
    // Verify API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/v1/authors/20',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({
            name: 'Updated Author',
            gender: 'Male',
            age: '45',
            country: 'Canada',
            genre: 'Science Fiction'
          })
        })
      );
    });
  });

  test('4. Deletes an author', async () => {
    renderAuthors();
    
    await waitFor(() => {
      expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
    });

    // Click delete button
    fireEvent.click(screen.getByTestId('delete-icon'));
    
    // Verify confirmation and API call
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this author?');
      expect(fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/v1/authors/20',
        expect.objectContaining({
          method: 'DELETE'
        })
      );
    });
  });

  test('validates author form fields', async () => {
    renderAuthors();
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Open add modal
    const addAuthorButtons = screen.getAllByRole('button', { name: /Add Author/i });
    fireEvent.click(addAuthorButtons[0]);
    
    // Try to submit empty form
    fireEvent.click(screen.getByRole('button', { name: /Add Author/i }));
    
    // Verify validation errors
    await waitFor(() => {
      expect(screen.getAllByText('Required')).toHaveLength(5);
    });
    
    // Test age validation
    fireEvent.change(screen.getByLabelText('Age'), { 
      target: { value: '5' } // Below minimum age
    });
    fireEvent.click(screen.getByRole('button', { name: /Add Author/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Minimum age is 12')).toBeInTheDocument();
    });
  });
});