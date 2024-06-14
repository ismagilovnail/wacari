<?php

namespace App\Http\Requests\Tips;

use Illuminate\Foundation\Http\FormRequest;

class TipsStoreRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'Заголовок',
            'description' => 'Описание'
        ];
    }
}
