<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class ProfileRequest extends FormRequest
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
            'name' => 'sometimes|nullable|string|max:50',
            'surname' => 'sometimes|nullable|string|max:100',
            'patronymic' => 'sometimes|nullable|string|max:100',
            'email' => ['string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore((int) $this->id)],
            'birth' => 'sometimes|nullable|string|date',
            'avatar' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,webp',
            'phone' => 'sometimes|nullable|string',
            'mailing_address' => 'sometimes|nullable|string|max:255',
            'notes' => 'sometimes|nullable|string|max:500',
            'password' => ['sometimes', 'nullable', 'confirmed', Rules\Password::defaults()]
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID',
            'name' => 'Имя',
            'surname' => 'Фамилия',
            'patronymic' => 'Отчество',
            'email' => 'E-mail',
            'birth' => 'Дата рождения',
            'avatar' => 'Фото',
            'phone' => 'Номер телефона',
            'mailing_address' => 'Почтовый адрес',
            'notes' => 'Дополнительные заметки',
            'password' => 'Пароль'
        ];
    }
}
