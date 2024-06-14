<?php

namespace App\Http\Requests\Admin\Country;

use App\Models\Country;
use Illuminate\Foundation\Http\FormRequest;

class CountryCreateRequest extends FormRequest
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
            'continent_id' => 'required|integer|exists:continents,id',
            'name' => 'required|string|max:255|unique:countries,name',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ];
    }

    public function attributes(): array
    {
        return [
            'continent_id' => 'Континент',
            'name'  => 'Название страны',
            'latitude' => 'Ширина',
            'longitude' => 'Долгота'
        ];
    }
}
