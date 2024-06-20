<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\File;
use Illuminate\Foundation\Http\FormRequest;

class StoreFileRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:500'],
            'size' => ['required', 'numeric'],
            'mime' => ['required'],
            'secret_key' => ['required'],
            'parent_id' => ['nullable'],
            'iv' => ['required'],
            'file' => [
                'required'
            ],
        ];
    }
}
