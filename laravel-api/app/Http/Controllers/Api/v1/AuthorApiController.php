<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Http\Resources\AuthorResource;
use App\Models\Author;

class AuthorApiController extends Controller
{
    /**
     * Return a paginated list of authors
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return AuthorResource::collection(Author::query()->orderby('created_at', 'desc')->paginate(10));
    }

    /**
     * Return a single author
     *
     * @param Author $author
     * @return AuthorResource
     */
    public function show(Author $author)
    {
        return AuthorResource::make($author);
    }

    /**
     * Create a new author
     *
     * @param StoreAuthorRequest $request
     * @return AuthorResource
     */
    public function store(StoreAuthorRequest $request)
    {
        $author = Author::create($request->validated());
        return AuthorResource::make($author);
    }

    /**
     * Update an existing author
     *
     * @param UpdateAuthorRequest $request
     * @param Author $author
     * @return AuthorResource
     */
    public function update(UpdateAuthorRequest $request, Author $author)
    {
        $author->update($request->validated());
        return AuthorResource::make($author);
    }

    /**
     * Delete an author
     *
     * @param Author $author
     * @return \Illuminate\Http\Response
     */
    public function destroy(Author $author)
    {
        $author->delete();
        return response()->noContent();
    }
}
