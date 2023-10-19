export interface Space {
    flight_number: number;
    mission_name: string,
    upcoming: boolean,
    launch_date_utc: number
    rocket: {
        rocket_name: string;
    },
    launch_success: boolean,
    links: {
        mission_patch: string;
    }
}

export interface SpaceXLaunchesContextType {
    launches: Space[];
    limit: number;
    total: number;
    setLimit: (newLimit: number) => void;
    setLaunches: (newLaunches: Space[]) => void;
    loading:boolean;
    setLoading: (loading: boolean) => void;
}