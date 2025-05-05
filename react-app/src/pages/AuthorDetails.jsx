import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Spinner from "../components/spinner"
import { API_URL } from "../utils/api"
import { BookOpenIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"

function AuthorDetails() {
    const [isLoading, setIsLoading] = useState(false)
    const [author, setAuthor] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        fetch(API_URL + 'authors/' + id)
            .then((res) => res.json())
            .then((data) => {
                setAuthor(data)
                setIsLoading(false)
            })
            .catch((e) => {
                console.log(e)
                setIsLoading(false)
            })
    }, [id])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            {isLoading ?                
                <Spinner />
            :
                author && (
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Link 
                                to="/authors" 
                                className="inline-flex items-center text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                            >
                                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                                Back to Authors
                            </Link>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                            <div className="md:flex">
                                {/* Author Image/Icon Section */}
                                <div className="md:flex-shrink-0 bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 p-8 flex items-center justify-center">
                                    <div className="h-40 w-40 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center">
                                        <svg 
                                            className="h-24 w-24 text-orange-500 dark:text-orange-400" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={1.5} 
                                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Author Details Section */}
                                <div className="p-8 flex-1">
                                    <div className="uppercase tracking-wide text-sm text-orange-600 dark:text-orange-400 font-semibold">
                                        Author Profile
                                    </div>
                                    <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                        {author.name}
                                    </h1>
                                    
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</h3>
                                            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                {author.gender}
                                            </p>
                                        </div>
                                        
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</h3>
                                            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                {author.age}
                                            </p>
                                        </div>
                                        
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</h3>
                                            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                {author.country}
                                            </p>
                                        </div>
                                        
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Genre</h3>
                                            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                {author.genre}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center">
                                        <BookOpenIcon className="h-6 w-6 text-orange-500 dark:text-orange-400 mr-2" />
                                        <span className="text-lg font-medium text-gray-900 dark:text-white">
                                            {author.book_count} {author.book_count === 1 ? 'book' : 'books'} published
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Books Section - You can add this if you want to show the author's books */}
                        {/* <div className="mt-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Published Books
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[].map(book => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>
                        </div> */}
                    </div>
                )
            }
        </div>
    )
}

export default AuthorDetails
