import {createContext, ReactNode, useEffect, useState} from 'react';
import {Space, SpaceXLaunchesContextType} from "../Services/SpaceList.ts";
import axios from "axios";

export const SpaceXLaunchesContext = createContext<SpaceXLaunchesContextType | undefined>(undefined);

export function SpaceXLaunchesProvider({children}: { children: ReactNode }) {
    const [launches, setLaunches] = useState<Space[]>([]);
    const [limit, setLimit] = useState<number>(9);
    const [page, setPage] = useState<number>(parseInt(localStorage.getItem('page') || '1') || 1);
    const [offset, setOffset] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [filterLaunchStatus, setFilterLaunchStatus] = useState<string>('');
    const [upcoming, setUpcoming] = useState<string>('');
    const [searchName, setSearchName] = useState<string>('');
    const [filterLaunchDate, setFilterLaunchDate] = useState<string>('');


    useEffect(() => {
        const getAllSpaces = () => {
            setLoading(true)
            const newOffset = (page - 1) * limit;
            const queryString = `limit=${limit}&offset=${newOffset}`;
            let url = `https://api.spacexdata.com/v3/launches`;

            const queryParams = [];
            queryParams.push(queryString);

            if (searchName) {
                queryParams.push(`rocket_name=${searchName}`);
            }

            url += upcoming
                ? `${upcoming}?${queryParams.join('&')}`
                : filterLaunchStatus
                    ? `${filterLaunchStatus}&${queryParams.join('&')}`
                    : `?${queryParams.join('&')}`;

            axios.get<Space[]>(url)
                .then(res => {

                    const now = new Date();
                    const startDate = new Date();

                    if (filterLaunchDate === 'last_week' || filterLaunchDate === 'last_month' || filterLaunchDate === 'last_year') {
                        const timeFrame = filterLaunchDate === 'last_week' ? 7 : (filterLaunchDate === 'last_month' ? 30 : 365);
                        startDate.setDate(now.getDate() - timeFrame);
                        const filteredLaunches = launches.filter((launch) => {
                            const launchDate = new Date(launch.launch_date_utc);
                            return launchDate >= startDate && launchDate <= now;
                        });
                        setLaunches(filteredLaunches);
                        setTotal(filteredLaunches.length);
                    } else {
                        setLaunches(res?.data)
                        setTotal(parseInt(res.headers['spacex-api-count']))
                    }
                    setLoading(false)
                }).catch(err => {
                console.log(err)
                setLaunches([])
                setLoading(false)
            })
        }

        getAllSpaces()
    }, [page, offset, filterLaunchStatus, searchName, limit, upcoming, filterLaunchDate])

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
                setUpcoming,
                filterLaunchDate,
                setFilterLaunchDate
            }}>
            {children}
        </SpaceXLaunchesContext.Provider>
    );
}
