#component
"use client"
import AdminLayout from '@/layout/AdminLayout';
import PackageTable from '@/components/table/PackageTable';
import React, { useEffect } from 'react'
import { useGetPackegeListQuery } from '@/redux/query/AdminQuery';
import useDebounce from '@/helper/useDebounce';
import { useState } from 'react';

const Package = () => {
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    // search and filtering
    const [search, setSearch] = useState('');
    const { debouncedValue } = useDebounce(search, 500);

    const queryParams = [
        { key: 'q', value: debouncedValue },
    ];

    // fetched data
    const { data: packageList, isError, isLoading, error, refetch } = useGetPackegeListQuery({
        page: page,
        perPage: perPage,
        queryParams: queryParams,
    });

    // search filter refetch
    useEffect(() => {
        refetch();
    }, [debouncedValue]);
    return (
        <AdminLayout>
            <div className='bg-white rounded-t-[4px] lg:rounded-t-none'>
                <input onchange={(e)=> setSearch(e.target.value) />
                <div className='pt-0 lg:pt-4 pl-2 lg:pl-4 lg:pr-4'>
                    <PackageTable packageList={packageList} refetch={refetch} setPage={setPage} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default Package;


  // ----------------------------------------------
  // ----------------------------------------------------
#useDebounce delay api call for search
import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearching(true);
            setDebouncedValue(value);
            setSearching(false);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return { debouncedValue, searching };
}

export default useDebounce;
