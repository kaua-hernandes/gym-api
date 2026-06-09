import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('check-in use case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(checkInsRepository);

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            userId: 'user-1',
            gymId: 'gym-1'
        });

        console.log(checkIn.created_at);

        expect(checkIn.id).toEqual(expect.any(String));
    });

    // red, green, refactor

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));


        await sut.execute({
            userId: 'user-1',
            gymId: 'gym-1'
        });

        expect(() => sut.execute({
            userId: 'user-1',
            gymId: 'gym-1'
        })).rejects.toBeInstanceOf(Error);
    });

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));


        await sut.execute({
            userId: 'user-1',
            gymId: 'gym-1'
        });

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));


        const { checkIn } = await sut.execute({
            userId: 'user-1',
            gymId: 'gym-1'
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});