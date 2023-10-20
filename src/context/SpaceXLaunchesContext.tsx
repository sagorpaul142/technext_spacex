import {createContext, ReactNode, useEffect, useState} from 'react';
import {Space, SpaceXLaunchesContextType} from "../Services/SpaceList.ts";
import axios from "axios";

export const SpaceXLaunchesContext = createContext<SpaceXLaunchesContextType | undefined>(undefined);

export function SpaceXLaunchesProvider({children}: { children: ReactNode }) {
    const [launches, setLaunches] = useState<Space[]>([]);
    const [limit, setLimit] = useState<number>(9);
    const [page, setPage] = useState<number>(parseInt(localStorage.getItem('page') || '1') || 1);
    const [offset, setOffset] = useState<number>(page * limit - 9);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [filterLaunchStatus, setFilterLaunchStatus] = useState<string>('');
    const [upcoming, setUpcoming] = useState<string>('');
    const [searchName, setSearchName] = useState<string>('');


    useEffect(() => {
        const getAllSpaces = () => {
            setLoading(true)

            const newOffset = (page - 1) * limit;
            const queryString = `limit=${limit}&offset=${newOffset}`;
            let url = `https://api.spacexdata.com/v3/launches`;

            if (searchName !== '') {
                const name = `rocket_name=${searchName}`;
                if (upcoming !== '') {
                    url += `${upcoming}?${name}&${queryString}`
                } else if (filterLaunchStatus !== '') {
                    url += `${filterLaunchStatus}&${name}&${queryString}`
                    setPage(1)
                    localStorage.setItem('page', page.toString());
                } else {
                    url += `?${name}&${queryString}`
                }

            } else {
                if (upcoming !== '') {
                    url += `${upcoming}?${queryString}`
                } else if (filterLaunchStatus !== '') {
                    url += `${filterLaunchStatus}&${queryString}`
                    setPage(1)
                    localStorage.setItem('page', page.toString());
                } else {
                    url += `?${queryString}`
                }
            }

            axios.get<Space[]>(url)
                .then(res => {
                    setLaunches(res?.data)
                    setTotal(parseInt(res.headers['spacex-api-count']))
                    setLoading(false)
                }).catch(err => {
                console.log(err)
                setLaunches([])
                setLoading(false)
            })
        }

        getAllSpaces()
    }, [page, offset, filterLaunchStatus, searchName, limit, upcoming, setUpcoming])

    useEffect(() => {
        if (!localStorage.getItem('page')) {
            localStorage.setItem('page', page.toString());
        }
    }, [page]);

    return (
        <SpaceXLaunchesContext.Provider
            value={{
                launches,
                limit,
                total,
                setLimit,
                setLaunches,
                loading,
                setLoading,
                setOffset,
                offset,
                page,
                setPage,
                filterLaunchStatus,
                setFilterLaunchStatus,
                searchName,
                setSearchName,
                upcoming,
                setUpcoming
            }}>
            {children}
        </SpaceXLaunchesContext.Provider>
    );
}
