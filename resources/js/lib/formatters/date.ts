function parseDate(value: string): Date {
    const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

    return new Date(dateOnlyPattern.test(value) ? `${value}T00:00:00` : value);
}

export function formatDate(value: string | null | undefined): string {
    if (!value) {
        return '-';
    }

    const date = parseDate(value);

    if (Number.isNaN(date.getTime())) {
        return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

export function formatDateTime(value: string | null | undefined): string {
    if (!value) {
        return '-';
    }

    const date = parseDate(value);

    if (Number.isNaN(date.getTime())) {
        return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
}
