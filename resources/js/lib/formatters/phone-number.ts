export function normalizeIndonesianPhoneNumber(
    phoneNumber: string | null | undefined,
): string | null {
    if (!phoneNumber) {
        return null;
    }

    const digits = phoneNumber.replace(/\D/g, '');

    if (!digits) {
        return null;
    }

    if (digits.startsWith('0')) {
        return `62${digits.slice(1)}`;
    }

    return digits.startsWith('62') ? digits : `62${digits}`;
}

export function getWhatsAppUrl(
    phoneNumber: string | null | undefined,
): string | null {
    const normalized = normalizeIndonesianPhoneNumber(phoneNumber);

    return normalized ? `https://wa.me/${normalized}` : null;
}
