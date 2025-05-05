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

function Authors() {
    const [authorList, setAuthors] = useState([])
    const [pagination, setPagination] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [currentAuthor, setCurrentAuthor] = useState(null)

    const {register, handleSubmit, formState: { errors }, reset} = useForm()

    const gender = ["Male", "Female"]
    const countries = ["UK", "Cananda", "Japan", "France"]

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
                                    Create Author
                                </button>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                Authors
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Browse a list of authors.
                                </p>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Author Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Age
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Country
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Genre
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {authorList.map((author) =>
                                <tr key={author["id"]} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {author["name"]}
                                    </th>
                                    <td className="px-6 py-4">
                                        {author["gender"]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {author["age"]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {author["country"]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {author["genre"]}
                                    </td>
                                    <td className="px-6 py-4 flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(author)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            <PencilSquareIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(author.id)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                        <Link 
                                            to={'/authors/' + author["id"]} 
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
                                    {isEditMode ? 'Edit Author' : 'Create Author'}
                                </Dialog.Title>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                                    <div className="mt-2 flex flex-col space-y-8 w-full">
                                        <div className="w-full">
                                            <input
                                                {...register("name", {required: {value: true, message: 'Required'}})}
                                                type="text"
                                                className="input"
                                                placeholder="Author name" />
                                                {errors.name && <p className="input-error">{errors.name.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <select
                                                {...register("gender", {required: {value: true, message: 'Required'}})}
                                                className="input"
                                                placeholder="Gender">
                                                    <option value="">Gender</option>
                                                    {gender.map((e) =>
                                                        <option key={e} value={e}>{e}</option>
                                                    )}
                                            </select>
                                            {errors.gender && <p className="input-error">{errors.gender.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <input
                                                {...register("age", {
                                                    required: {value: true, message: 'Required'},
                                                    min: {value: 12, message: 'Minimun age is 12'},
                                                    max: {value: 100, message: 'Max age is 100'}
                                                })}
                                                type="number"
                                                className="input"
                                                placeholder="Age" />
                                                {errors.age && <p className="input-error">{errors.age.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <select
                                                {...register("country", {required: {value: true, message: 'Required'},minLength: 2})}
                                                className="input"
                                                placeholder="Country">
                                                    <option value="">Country</option>
                                                    {countries.map((e) =>
                                                        <option key={e} value={e}>{e}</option>
                                                    )}
                                            </select>
                                            {errors.country && <p className="input-error">{errors.country.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <input
                                                {...register("genre", {required: {value: true, message: 'Required'}})}
                                                type="text"
                                                className="input"
                                                placeholder="Genre" />
                                                {errors.genre && <p className="input-error">{errors.genre.message}</p>}
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

export default Authors