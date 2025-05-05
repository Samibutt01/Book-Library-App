import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Spinner from "../components/spinner"
import { API_URL } from "../utils/api"
import { BookOpenIcon, ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline"

function BookDetails() {
    const [isLoading, setIsLoading] = useState(false)
    const [book, setBook] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        fetch(API_URL + 'books/' + id)
            .then((res) => res.json())
            .then((data) => {
                setBook(data)
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
                book && (
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Link 
                                to="/books" 
                                className="inline-flex items-center text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                            >
                                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                                Back to Books
                            </Link>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                            <div className="md:flex">
                                {/* Book Icon Section */}
                                <div className="md:flex-shrink-0 bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 p-8 flex items-center justify-center">
                                    <div className="h-40 w-40 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center">
                                        <BookOpenIcon className="h-24 w-24 text-orange-500 dark:text-orange-400" />
                                    </div>
                                </div>

                                {/* Book Details Section */}
                                <div className="p-8 flex-1">
                                    <div className="uppercase tracking-wide text-sm text-orange-600 dark:text-orange-400 font-semibold">
                                        Book Details
                                    </div>
                                    <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                        {book.name}
                                    </h1>
                                    
                                    <div className="mt-6">
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">ISBN</h3>
                                            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                {book.isbn}
                                            </p>
                                        </div>
                                    </div>

                                    {book.author && (
                                        <div className="mt-8">
                                            <div className="flex items-center">
                                                <UserIcon className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-2" />
                                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    Author Information
                                                </h2>
                                            </div>
                                            
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
                                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                        {book.author.name}
                                                    </p>
                                                </div>
                                                
                                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</h3>
                                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                        {book.author.gender}
                                                    </p>
                                                </div>
                                                
                                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</h3>
                                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                        {book.author.age}
                                                    </p>
                                                </div>
                                                
                                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</h3>
                                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                        {book.author.country}
                                                    </p>
                                                </div>
                                                
                                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Genre</h3>
                                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                        {book.author.genre}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default BookDetails
