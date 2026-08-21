import { router, useForm } from '@inertiajs/react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Loader2, RotateCcw, Search as SearchIcon } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { SearchInput as Search } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { UnifiedFilter } from '@/components/unified-filter';
import { cn } from '@/lib/utils';
import type { DataTableLinks, DataTableMeta } from '@/types';

type FilterOption = {
    key: string;
    label: string;
    values: { label: string; value: string | number }[];
};

type DataTableProps<TData, TValue> = {
    // URL dasar halaman index-nya, misal hasil dari route('users.index').
    // Dipakai untuk request GET saat search/filter/reset (bukan pakai Wayfinder).
    routeUrl: string;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    meta: DataTableMeta;
    links: DataTableLinks;
    filtersSchema?: FilterOption[];
    extraActions?: React.ReactNode;
    palette?: 'default' | 'sba';
};

export function DataTable<TData, TValue = unknown>({
    routeUrl,
    columns,
    data,
    meta,
    links,
    filtersSchema = [],
    extraActions,
    palette = 'default',
}: DataTableProps<TData, TValue>) {
    const pageCount = useMemo(
        () => Math.max(1, Math.ceil(meta.total / meta.per_page)),
        [meta.total, meta.per_page],
    );
    const [sorting, setSorting] = useState<SortingState>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { data: form, setData } = useForm<{
        search: string;
        filters: Record<string, string | number | null>;
        page: number;
    }>({
        search: '',
        filters: {},
        page: meta.current_page,
    });

    // Sync form state dengan URL params saat mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const filters: Record<string, string | number | null> = {};
        urlParams.forEach((value, key) => {
            const match = key.match(/^filters\[(.+)\]$/);

            if (match) {
                filters[match[1]] = value;
            }
        });
        const hasSearch = !!searchParam && searchParam.length > 0;
        const hasFilters = Object.keys(filters).length > 0;

        if (hasSearch || hasFilters) {
            setData((prev) => ({
                ...prev,
                search: searchParam || '',
                filters: filters,
            }));
        }
    }, [setData]);

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount,
        meta: {
            current_page: meta.current_page,
            per_page: meta.per_page,
        },
    });

    // Pagination: pakai URL dari links.prev / links.next langsung
    const handlePageChangeByUrl = (url: string | null) => {
        if (!url || isLoading) {
            return;
        }

        setIsLoading(true);
        router.get(
            url,
            {},
            {
                preserveState: true,
                replace: true,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    // Search/filter submit: selalu reset ke halaman 1
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        router.get(
            routeUrl,
            { ...form, page: 1 },
            {
                preserveState: true,
                replace: true,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    // Reset search & filter & page
    const handleReset = () => {
        setIsLoading(true);
        setData({
            search: '',
            filters: {},
            page: 1,
        });
        router.get(
            routeUrl,
            { search: '', filters: {}, page: 1 },
            {
                preserveState: true,
                replace: true,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const shouldShowReset =
        (!!form.search && form.search !== '') ||
        Object.values(form.filters ?? {}).some((v) => v !== null && v !== '');

    return (
        <div className="space-y-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 md:flex-row"
                >
                    <Search
                        value={form.search ?? ''}
                        onChange={(val) => setData('search', val)}
                        disabled={isLoading}
                    />
                    {filtersSchema.length > 0 && (
                        <UnifiedFilter
                            columns={filtersSchema}
                            selectedFilters={form.filters}
                            onChange={(filters) => setData('filters', filters)}
                            disabled={isLoading}
                        />
                    )}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        variant={palette === 'sba' ? 'sbaPrimary' : 'default'}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Mencari...
                            </span>
                        ) : (
                            <>
                                <SearchIcon />
                                Cari
                            </>
                        )}
                    </Button>
                    {shouldShowReset && (
                        <Button
                            type="button"
                            variant='secondary'
                            onClick={handleReset}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Reset
                                </span>
                            ) : (
                                <>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Reset
                                </>
                            )}
                        </Button>
                    )}
                </form>
                {extraActions && (
                    <div className="flex justify-end">{extraActions}</div>
                )}
            </div>

            <div
                className={cn(
                    'relative overflow-x-auto rounded-md border',
                    palette === 'sba' && 'border-sba-primary/15',
                )}
            >
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Memuat data...
                        </div>
                    </div>
                )}
                <Table className="table-auto">
                    <TableHeader
                        className={cn(
                            palette === 'sba' &&
                            'bg-sba-primary [&_th]:text-white [&_tr]:border-sba-primary [&_tr]:hover:bg-sba-primary',
                        )}
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef
                                                    .header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="py-6 text-center text-muted-foreground"
                                >
                                    Tidak ada data ditemukan.
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Pagination>
                <PaginationContent>
                    {/* Tombol Previous */}
                    <PaginationItem>
                        <PaginationPrevious
                            className={cn(
                                !links.prev || isLoading
                                    ? 'pointer-events-none opacity-40'
                                    : 'cursor-pointer',
                            )}
                            onClick={() => handlePageChangeByUrl(links.prev)}
                        />
                    </PaginationItem>

                    {/* Kotak-kotak nomor halaman dengan ellipsis */}
                    {(() => {
                        const pages = links.pages ?? [];
                        const current = meta.current_page;
                        const total = pageCount;

                        // Tampilkan maks 7 item: [1] [...] [cur-1] [cur] [cur+1] [...] [last]
                        const getPageItems = () => {
                            if (total <= 7) {
                                return pages.map((p) => ({ type: 'page' as const, ...p }));
                            }

                            const items: ({ type: 'page'; page: number; url: string } | { type: 'ellipsis'; key: string })[] = [];

                            // Selalu tampil halaman 1
                            items.push({ type: 'page', ...pages[0] });

                            if (current > 3) {
                                items.push({ type: 'ellipsis', key: 'start' });
                            }

                            // Halaman di sekitar current
                            for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
                                items.push({ type: 'page', ...pages[p - 1] });
                            }

                            if (current < total - 2) {
                                items.push({ type: 'ellipsis', key: 'end' });
                            }

                            // Selalu tampil halaman terakhir
                            items.push({ type: 'page', ...pages[total - 1] });

                            return items;
                        };

                        return getPageItems().map((item) => {
                            if (item.type === 'ellipsis') {
                                return (
                                    <PaginationItem key={item.key}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }
                            return (
                                <PaginationItem key={item.page}>
                                    <PaginationLink
                                        isActive={item.page === current}
                                        className={cn(
                                            'cursor-pointer',
                                            item.page === current && palette === 'sba' &&
                                            'border-sba-primary bg-sba-primary text-white hover:bg-sba-primary/90 hover:text-white',
                                        )}
                                        onClick={() => handlePageChangeByUrl(item.url)}
                                    >
                                        {item.page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        });
                    })()}

                    {/* Tombol Next */}
                    <PaginationItem>
                        <PaginationNext
                            className={cn(
                                !links.next || isLoading
                                    ? 'pointer-events-none opacity-40'
                                    : 'cursor-pointer',
                            )}
                            onClick={() => handlePageChangeByUrl(links.next)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
