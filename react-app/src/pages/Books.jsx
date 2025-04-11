import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import myHeaders, { API_URL } from "../utils/api"
import { Link } from "react-router-dom"
import htmlDecode from "../utils/decodeHtml"
import Spinner from "../components/spinner"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Books() {
    const [authorList, setAuthors] = useState([])
    const [bookList, setBooks] = useState([])
    const [pagination, setPagination] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [currentBook, setCurrentBook] = useState(null)

    const {register, handleSubmit, formState: { errors }, reset} = useForm()

    const onSubmitBook = (data) => {
        setIsLoading(true)
        
        const method = isEditMode ? 'PUT' : 'POST'
        const endpoint = isEditMode ? `books/${currentBook.id}` : 'books'

        const requestOptions = {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        }

        fetch(API_URL + endpoint, requestOptions)
            .then(response => {
                setIsOpen(false)
                setIsLoading(false)
                getBooks(API_URL + "books")
                reset()
            })
            .then(result => console.log(result))
            .catch(error => {
                console.log('error', error)
                setIsLoading(false)
            })
    }

    const handleDelete = (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            setIsLoading(true)
            
            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            }

            fetch(API_URL + `books/${bookId}`, requestOptions)
                .then(response => {
                    setIsLoading(false)
                    getBooks(API_URL + "books")
                })
                .catch(error => {
                    console.log('error', error)
                    setIsLoading(false)
                })
        }
    }

    const handleEdit = (book) => {
        setCurrentBook(book)
        setIsEditMode(true)
        reset({
            name: book.name,
            isbn: book.isbn,
            author_id: book.author?.id
        })
        setIsOpen(true)
    }

    function nextPage(link) {
        if (link["url"] != null && !link["active"]) {
            getBooks(link["url"])
        }
    }

    function closeModal() {
        setIsOpen(false)
        setIsEditMode(false)
        setCurrentBook(null)
        reset()
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        getBooks(API_URL + "books")
        getAuthors()
    }, [])

    function getBooks(url) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setBooks(data["data"])
                setPagination(data["meta"])
            })
    }

    function getAuthors() {
        fetch(API_URL + "authors")
            .then((res) => res.json())
            .then((data) => {
                setAuthors(data["data"])
            })
    }

    return (
        <>
            {isLoading ?
                <Spinner/>
            :
                <div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-100">
                        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4">
                            <div></div>
                            <div>
                            <button
                                type="button"
                                onClick={openModal}
                                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                >
                                    Create Book
                                </button>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                Books
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Browse a list of books available in the library.
                                </p>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Book title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ISBN
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Author
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {bookList.map((book) =>
                                <tr key={book["id"]} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {book["name"]}
                                    </th>
                                    <td className="px-6 py-4">
                                        {book["isbn"]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book["author"] && <span>{book["author"]["name"]}</span>}
                                    </td>
                                    <td className="px-6 py-4 flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(book)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            <PencilSquareIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                        <Link 
                                            to={'/books/' + book["id"]} 
                                            className="font-medium text-green-600 dark:text-green-500 hover:underline"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        {pagination != null &&
                            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                    Showing <span className="font-semibold text-gray-900 dark:text-white">
                                        {pagination["from"]}-{pagination["to"]}
                                    </span> of <span className="font-semibold text-gray-900 dark:text-white">
                                        {pagination["total"]}
                                    </span>
                                </span>
                                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                    {pagination["links"].map((link, index) => 
                                        <li key={index}>
                                            <button                                                
                                                className={
                                                    classNames(
                                                        "pagination-link",
                                                        (index == 0)
                                                        ? "rounded-s-lg"
                                                        : "",
                                                        (index == (pagination["links"].length -1))
                                                        ? "rounded-e-lg"
                                                        : "",
                                                        link["active"]
                                                        ? "text-blue-600 bg-blue-50"
                                                        : ""
                                                    )
                                                }
                                                onClick={() => nextPage(link)}
                                            >
                                                {htmlDecode(link["label"])}
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        }
                    </div>

                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 pb-4"
                                >
                                    {isEditMode ? 'Edit Book' : 'Create Book'}
                                </Dialog.Title>
                                <form onSubmit={handleSubmit(onSubmitBook)} className="flex flex-col space-y-4">
                                    <div className="mt-2 flex flex-col space-y-8 w-full">
                                        <div className="w-full">
                                            <input
                                                {...register("name", {required: {value: true, message: 'Required'}})}
                                                type="text"
                                                className="input"
                                                placeholder="Book title" />
                                                {errors.name && <p className="input-error">{errors.name.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <input
                                                {...register("isbn", {
                                                    required: {value: true, message: 'Required'}
                                                })}
                                                type="text"
                                                className="input"
                                                placeholder="ISBN" />
                                                {errors.isbn && <p className="input-error">{errors.isbn.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <select
                                                {...register("author_id", {required: {value: true, message: 'Required'}})}
                                                className="input"
                                                placeholder="Author">
                                                    <option value="">Author</option>
                                                    {authorList.map((e) =>
                                                        <option key={e["id"]} value={e["id"]}>{e["name"]}</option>
                                                    )}
                                            </select>
                                            {errors.author_id && <p className="input-error">{errors.author_id.message}</p>}
                                        </div>

                                    </div>

                                    <div className="mt-4 flex flex-row space-x-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                            >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            >
                                            {isEditMode ? 'Update' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>
                </div>
            }
        </>
    )
}

export default Books