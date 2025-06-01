<?php

namespace Tests\Feature;

use App\Models\Author;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthorApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_author_creation_validation()
    {
        $response = $this->postJson('/api/v1/authors', []);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'gender', 'age', 'country', 'genre']);
    }

    /** @test */
    public function test_full_author_lifecycle()
    {
        // Create
        $create = $this->postJson('/api/v1/authors', [
            'name' => 'J.K. Rowling',
            'gender' => 'female',
            'age' => 57,
            'country' => 'United Kingdom',
            'genre' => 'Fantasy'
        ]);

        $create->assertStatus(201);
        $id = $create->json('id');

        // Read
        $get = $this->get("/api/v1/authors/{$id}");
        $get->assertStatus(200);
        $get->assertJson([
            'name' => 'J.K. Rowling',
            'book_count' => 0
        ]);

        // Update
        $update = $this->putJson("/api/v1/authors/{$id}", [
            'name' => 'Joanne Rowling',
            'gender' => 'female',
            'age' => 58,
            'country' => 'United Kingdom',
            'genre' => 'Fantasy, Drama'
        ]);
        $update->assertStatus(200);
        $update->assertJson(['name' => 'Joanne Rowling']);

        // Delete
        $delete = $this->delete("/api/v1/authors/{$id}");
        $delete->assertStatus(204);

        // Verify deleted
        $getDeleted = $this->get("/api/v1/authors/{$id}");
        $getDeleted->assertStatus(404);
    }

    /** @test */
    public function it_returns_book_count_with_author()
    {
        $author = Author::factory()->create();
        $author->books()->createMany([
            ['name' => 'Book 1', 'isbn' => '1234567890'],
            ['name' => 'Book 2', 'isbn' => '0987654321']
        ]);

        $response = $this->get("/api/v1/authors/{$author->id}");
        $response->assertStatus(200);
        $response->assertJson(['book_count' => 2]);
    }
}
