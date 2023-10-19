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