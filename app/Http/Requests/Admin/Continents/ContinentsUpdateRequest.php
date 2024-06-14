<?php

namespace App\Http\Requests\Admin\Continents;

use Illuminate\Foundation\Http\FormRequest;

class ContinentsUpdateRequest extends FormRequest
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
            'name' => 'required|string|max:255',
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID',
            'name' => 'Название континента',
        ];
    }
}
