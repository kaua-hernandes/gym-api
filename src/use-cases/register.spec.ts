import { expect, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';

describe('register use case', () => {
    it('should hash user password upon registration', async () => {
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email) {
                return null; // Simulate that no user exists with the given email
            },
            async create(data) {
                return {
                    id: 'user-id',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                };
            }
        });

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'john.doe@example.com.eua',
            password: 'password123'
        });

        const isPasswordCorrectlyHashed = await compare('password123', user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});