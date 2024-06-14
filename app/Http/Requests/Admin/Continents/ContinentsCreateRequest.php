<?php

namespace App\Http\Requests\Admin\Continents;

use Illuminate\Foundation\Http\FormRequest;

class ContinentsCreateRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:continents,name',
        ];
    }

    public function attributes(): array
    {
        return [
          'name' => 'Название Континента'
        ];
    }
}
