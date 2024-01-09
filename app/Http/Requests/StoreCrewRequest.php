<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCrewRequest extends FormRequest
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
            'type' => 'required|string|in:store,update',
            'title' => 'required|string',
            'instagram' => 'required|string',
            'website' => 'required|string',
            'email' => 'required|email',
            'image_url' => 'nullable|required_if:type,store|mimes:webp|max:2048',
            'description' => 'required|string'
        ];
    }
}
