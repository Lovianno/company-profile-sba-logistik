<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Tentukan apakah user berhak membuat request ini.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Aturan validasi — dibedakan antara store (POST) dan update (PUT/PATCH).
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return match ($this->method()) {
            'POST' => $this->createRules(),
            'PUT', 'PATCH' => $this->updateRules(),
            default => [],
        };
    }

    /**
     * Aturan untuk membuat user baru — password wajib.
     */
    protected function createRules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:100'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', Rule::in(['admin', 'finance', 'cs'])],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ];
    }

    /**
     * Aturan untuk update user — password opsional, email ignore milik user sendiri.
     */
    protected function updateRules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:100'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'email' => ['required', 'string', 'email', 'max:255',
                Rule::unique('users', 'email')->ignore($this->route('user'))],
            'password' => ['nullable', 'string', 'min:8'],
            'role' => ['required', Rule::in(['admin', 'finance', 'cs'])],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ];
    }

    /**
     * Pesan error kustom.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'full_name.max' => 'Nama lengkap maksimal 100 karakter.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan.',
            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 8 karakter.',
            'role.required' => 'Role wajib dipilih.',
            'role.in' => 'Role tidak valid. Pilih: admin, finance, atau cs.',
            'status.required' => 'Status wajib dipilih.',
            'status.in' => 'Status tidak valid. Pilih: active atau inactive.',
        ];
    }
}
