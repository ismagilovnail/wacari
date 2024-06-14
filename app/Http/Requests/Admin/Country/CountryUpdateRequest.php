<?php

namespace App\Http\Requests\Admin\Country;

use App\Models\Country;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CountryUpdateRequest extends FormRequest
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
            'continent_id' => 'required|integer|exists:continents,id',
            'name' => ['required', 'string', 'min:3', 'max:255', Rule::unique(Country::class)->ignore($this->id)],
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID',
            'continent_id' => 'Континент',
            'name'  => 'Название страны',
            'latitude' => 'Ширина',
            'longitude' => 'Долгота'
        ];
    }
}
