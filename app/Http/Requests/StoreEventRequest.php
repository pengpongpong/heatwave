<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:256',
            'date' => 'required|date',
            'time' => 'required|string',
            'location' => 'required|string|max:256',
            'artist' => 'required|string|max:256',
            'cover_url' => 'required|mimes:webp|max:2048',
            'description' => 'required|string',
        ];
    }
}
