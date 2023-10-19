import {createContext, ReactNode, useEffect, useState} from 'react';
import {Space, SpaceXLaunchesContextType} from "../Services/SpaceList.ts";
import axios from "axios";

export const SpaceXLaunchesContext = createContext<SpaceXLaunchesContextType | undefined>(undefined);

export function SpaceXLaunchesProvider({children}: { children: ReactNode }) {
    const [launches, setLaunches] = useState<Space[]>([]);
    const [limit, setLimit] = useState<number>(9);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const getAllSpaces = () => {
        setLoading(true)
        axios.get<Space[]>(`https://api.spacexdata.com/v3/launches?limit=${limit}`)
            .then(res => {
                setLaunches(res?.data)
                setTotal(parseInt(res.headers['spacex-api-count']))
                setLoading(false)
            }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        getAllSpaces()
    }, [])
    console.log(launches)

    return (
        <SpaceXLaunchesContext.Provider value={{launches, limit, total, setLimit, setLaunches, loading, setLoading}}>
            {children}
        </SpaceXLaunchesContext.Provider>
    );
}
