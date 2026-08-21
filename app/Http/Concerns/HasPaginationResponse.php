<?php

namespace App\Http\Concerns;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

trait HasPaginationResponse
{
    /**
     * Buat array URL per halaman untuk pagination kotak-kotak di frontend.
     *
     * @param  LengthAwarePaginator<mixed>  $paginator
     * @return array<int, array{page: int, url: string}>
     */
    protected function paginationPages(LengthAwarePaginator $paginator): array
    {
        return collect(range(1, $paginator->lastPage()))
            ->map(fn ($page) => [
                'page' => $page,
                'url'  => $paginator->url($page),
            ])
            ->all();
    }
}
