<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\Status;

class UpdateCommunityJoinRequest extends FormRequest
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
            'membership_key' => Rule::requiredIf($this->status == Status::ACCEPT->value),
            'role' => Rule::requiredIf($this->status == Status::ACCEPT->value),
            'user_id' => Rule::requiredIf($this->status == Status::ACCEPT->value),
            'status' => ['required']
        ];
    }
}
