import type { ZodType } from 'zod';

type ValidationResult<T> =
    | { success: true; data: T }
    | { success: false; errors: Record<string, string[]> };

export function useZod<T>(schema: ZodType<T>) {
    const validate = (data: unknown): ValidationResult<T> => {
        const result = schema.safeParse(data);

        if (result.success) {
            return { success: true, data: result.data };
        }

        const errors: Record<string, string[]> = {};

        result.error.issues.forEach((issue) => {
            const key = issue.path.join('.');

            if (!errors[key]) {
                errors[key] = [];
            }

            errors[key].push(issue.message);
        });

        return { success: false, errors };
    };

    return { validate };
}