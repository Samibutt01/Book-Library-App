<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;

class BookController extends Controller
{
    /**
     * Return a paginated list of books with their authors
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return BookResource::collection(Book::query()->with('author')->orderby('created_at', 'desc')->paginate(10));
    }

    /**
     * Return a single book with its author
     *
     * @param Book $book
     * @return BookResource
     */
    public function show(Book $book)
    {
        $data = Book::with('author')->find($book->id);
        return BookResource::make($data);
    }

    /**
     * Create a new book
     *
     * @param StoreBookRequest $request
     * @return BookResource
     */
    public function store(StoreBookRequest $request)
    {
        $book = Book::create($request->validated());
        return BookResource::make($book);
    }

    /**
     * Update an existing book
     *
     * @param UpdateBookRequest $request
     * @param Book $book
     * @return BookResource
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $book->update($request->validated());
        return BookResource::make($book);
    }

    /**
     * Delete a book
     *
     * @param Book $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->noContent();
    }
}
