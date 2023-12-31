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
    offset: number;
    page: number;
    total: number;
    setLimit: (newLimit: number) => void;
    setOffset: (newOffset: number) => void;
    setPage: (newPage: number) => void;
    setLaunches: (newLaunches: Space[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    filterLaunchStatus: string;
    setFilterLaunchStatus: (newFilterLaunchStatus: string) => void;
    searchName: string;
    setSearchName: (newSearchName: string) => void;
    upcoming: string;
    setUpcoming: (newUpcoming: string) => void;
    filterLaunchDate: string;
    setFilterLaunchDate: (newFilterLaunchDate: string) => void;
}