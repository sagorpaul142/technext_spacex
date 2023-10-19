import {createContext, ReactNode, useEffect, useState} from 'react';
import {Space} from "../Services/SpaceList.ts";
import axios from "axios";

interface SpaceXLaunchesContextType {
    launches: Space[];
    limit: number;
    total: number;
    setLimit: (newLimit: number) => void;
    setLaunches: (launches: Space[]) => void;
}

export const SpaceXLaunchesContext = createContext<SpaceXLaunchesContextType | undefined>(undefined);

export function SpaceXLaunchesProvider({children}: { children: ReactNode }) {
    const [launches, setLaunches] = useState<Space[]>([]);
    const [limit, setLimit] = useState<number>(9);
    const [total, setTotal] = useState<number>(0);

    const getAllSpaces = () => {
        axios.get<Space[]>(`https://api.spacexdata.com/v3/launches?limit=${limit}`)
            .then(res => {
                setLaunches(res?.data)
                setTotal(parseInt(res.headers['spacex-api-count']))
            }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllSpaces()
    }, [])
    console.log(launches)

    return (
        <SpaceXLaunchesContext.Provider value={{launches, limit, total, setLimit, setLaunches}}>
            {children}
        </SpaceXLaunchesContext.Provider>
    );
}
