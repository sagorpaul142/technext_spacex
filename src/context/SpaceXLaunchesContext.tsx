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
    const [apiUrl, setApiUrl] = useState<string>('');

    const getAllSpaces = () => {
        setLoading(true)

        const newOffset = (page - 1) * limit;
        const queryString = `limit=${limit}&offset=${newOffset}`;
        let url = `https://api.spacexdata.com/v3/launches`;
        console.log(newOffset, queryString)

        if (apiUrl !== '' && apiUrl !== '/upcoming') {
            url += `${apiUrl}&${queryString}`
        } else if (apiUrl !== '') {
            url += `${apiUrl}`
            setPage(1)
            localStorage.setItem('page', page.toString());
        } else {
            url += `?${queryString}`
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

    useEffect(() => {
        getAllSpaces()
    }, [page, offset, apiUrl])

    useEffect(() => {
        if (!localStorage.getItem('page')) {
            localStorage.setItem('page', page.toString());
        }
    }, [page]);

    console.log(launches)

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
                apiUrl,
                setApiUrl
            }}>
            {children}
        </SpaceXLaunchesContext.Provider>
    );
}
