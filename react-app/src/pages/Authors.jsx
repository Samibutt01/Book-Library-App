import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import myHeaders, { API_URL } from "../utils/api"
import { Link } from "react-router-dom"
import htmlDecode from "../utils/decodeHtml"
import Spinner from "../components/spinner"
import { PencilSquareIcon, TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Authors() {
    const [authorList, setAuthors] = useState([])
    const [pagination, setPagination] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [currentAuthor, setCurrentAuthor] = useState(null)

    const {register, handleSubmit, formState: { errors }, reset} = useForm()

    const gender = ["Male", "Female"]
    const countries = ["Kenya", "Canada", "Japan", "France"]

    const onSubmit = (data) => {
        setIsLoading(true)
        
        let requestOptions = {
            method: isEditMode ? 'PUT' : 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        }

        const endpoint = isEditMode 
            ? `authors/${currentAuthor.id}` 
            : "authors"

        fetch(API_URL + endpoint, requestOptions)
            .then(response => {
                setIsOpen(false)
                setIsLoading(false)
                getAuthors(API_URL + "authors")
                reset()
            })
            .then(result => console.log(result))
            .catch(error => {
                console.log('error', error)
                setIsLoading(false)
            })
    }

    const handleDelete = (authorId) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            setIsLoading(true)
            
            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            }

            fetch(API_URL + `authors/${authorId}`, requestOptions)
                .then(response => {
                    setIsLoading(false)
                    getAuthors(API_URL + "authors")
                })
                .catch(error => {
                    console.log('error', error)
                    setIsLoading(false)
                })
        }
    }

    const handleEdit = (author) => {
        setCurrentAuthor(author)
        setIsEditMode(true)
        reset({
            name: author.name,
            gender: author.gender,
            age: author.age,
            country: author.country,
            genre: author.genre
        })
        setIsOpen(true)
    }

    function nextPage(link) {
        if (link["url"] != null && !link["active"]) {
            getAuthors(link["url"])
        }
    }

    function closeModal() {
        setIsOpen(false)
        setIsEditMode(false)
        setCurrentAuthor(null)
        reset()
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        getAuthors(API_URL + "authors")
    }, [])

    function getAuthors(url) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setAuthors(data["data"])
                setPagination(data["meta"])
            })
    }

    return (
        <>
            {isLoading ?
                <Spinner />
            :
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Authors</h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Manage your library's authors
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <button
                                type="button"
                                onClick={openModal}
                                className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Add Author
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Author Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Age
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Country
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Genre
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {authorList.map((author) =>
                                <tr key={author["id"]} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {author["name"]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {author["gender"]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {author["age"]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {author["country"]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {author["genre"]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-3">
                                            <button
                                                onClick={() => handleEdit(author)}
                                                className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300"
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(author.id)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                title="Delete"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                            <Link 
                                                to={'/authors/' + author["id"]} 
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                title="View Details"
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {pagination != null &&
                        <div className="bg-white dark:bg-gray-800 px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => nextPage(pagination.links[0])}
                                    disabled={pagination.current_page === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => nextPage(pagination.links[pagination.links.length - 1])}
                                    disabled={pagination.current_page === pagination.last_page}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing <span className="font-medium">{pagination.from}</span> to <span className="font-medium">{pagination.to}</span> of{' '}
                                        <span className="font-medium">{pagination.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        {pagination.links.map((link, index) => (
                                            <button
                                                key={index}
                                                onClick={() => nextPage(link)}
                                                disabled={link.url === null}
                                                className={classNames(
                                                    link.active
                                                        ? 'z-10 bg-orange-50 border-orange-500 text-orange-600 dark:bg-gray-700 dark:border-orange-400 dark:text-orange-300'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',
                                                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                                                    index === 0 ? 'rounded-l-md' : '',
                                                    index === pagination.links.length - 1 ? 'rounded-r-md' : ''
                                                )}
                                            >
                                                {htmlDecode(link.label)}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    }

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
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                >
                                    {isEditMode ? 'Edit Author' : 'Add New Author'}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Author Name
                                            </label>
                                            <input
                                                id="name"
                                                {...register("name", {required: {value: true, message: 'Required'}})}
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="Author name"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Gender
                                            </label>
                                            <select
                                                id="gender"
                                                {...register("gender", {required: {value: true, message: 'Required'}})}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">Select Gender</option>
                                                {gender.map((e) =>
                                                    <option key={e} value={e}>{e}</option>
                                                )}
                                            </select>
                                            {errors.gender && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gender.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Age
                                            </label>
                                            <input
                                                id="age"
                                                {...register("age", {
                                                    required: {value: true, message: 'Required'},
                                                    min: {value: 12, message: 'Minimum age is 12'},
                                                    max: {value: 100, message: 'Maximum age is 100'}
                                                })}
                                                type="number"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="Age"
                                            />
                                            {errors.age && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.age.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Country
                                            </label>
                                            <select
                                                id="country"
                                                {...register("country", {required: {value: true, message: 'Required'},minLength: 2})}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">Select Country</option>
                                                {countries.map((e) =>
                                                    <option key={e} value={e}>{e}</option>
                                                )}
                                            </select>
                                            {errors.country && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Genre
                                            </label>
                                            <input
                                                id="genre"
                                                {...register("genre", {required: {value: true, message: 'Required'}})}
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="Genre"
                                            />
                                            {errors.genre && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.genre.message}</p>}
                                        </div>

                                        <div className="mt-4 flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                            >
                                                {isEditMode ? 'Update Author' : 'Add Author'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
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

export default Authors
