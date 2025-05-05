import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Books from './pages/Books.jsx'
import Authors from './pages/Authors.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import AuthorDetails from './pages/AuthorDetails.jsx'
import BookDetails from './pages/BookDetails.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'books',
        element: <Books />
      },
      {
        path: 'books/:id',
        element: <BookDetails />
      },
      {
        path: 'authors',
        element: <Authors />
      },
      {
        path: 'authors/:id',
        element: <AuthorDetails />
      },
      {
        path: 'about',
        element: <AboutUs />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
