import type { TimestampedModel } from './base';

export type UserRole = 'admin' | 'finance' | 'cs';
export type UserStatus = 'active' | 'inactive';

export interface User extends TimestampedModel {
    id: number;
    email: string;
    full_name: string;
    phone_number: string | null;
    role: UserRole;
    status: UserStatus;
    email_verified_at: string | null;
    avatar?: string;
    two_factor_enabled?: boolean;
    [key: string]: unknown;
}
