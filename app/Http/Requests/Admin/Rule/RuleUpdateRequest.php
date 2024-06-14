<?php

namespace App\Http\Requests\Admin\Rule;

use Illuminate\Foundation\Http\FormRequest;

class RuleUpdateRequest extends FormRequest
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
            'id' => 'required|integer|gt:0',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID',
            'title' => 'Заголовок',
            'description' => 'Описание'
        ];
    }
}
