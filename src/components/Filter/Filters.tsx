import searchIcon from "../../assets/search_icon.png";
import styles from "./Filter.module.scss"
import React, {useContext, useEffect, useState} from "react";
import {SpaceXLaunchesContext} from "../../context/SpaceXLaunchesContext.tsx";
import {SpaceXLaunchesContextType} from "../../Services/SpaceList.ts";

const Filters = () => {
    const {
        setFilterLaunchStatus,
        setUpcoming,
        page,
        setPage,
        setSearchName,
        setFilterLaunchDate
    } = useContext(SpaceXLaunchesContext) as SpaceXLaunchesContextType
    const [selectedOption, setSelectedOption] = useState('');
    const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
    const [searchByName, setSearchByName] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        if (event.target.value !== '') {
            setFilterLaunchStatus(`?launch_success=${event.target.value}`)
            setPage(1)
            localStorage.setItem('page', page.toString());
            setShowUpcomingOnly(false)
            setFilter('')
            setFilterLaunchDate('')
            // setSearchByName('')
            // setSearchName('')
        } else {
            setFilterLaunchStatus('')
            setSelectedOption('');
        }
    };

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (searchByName) {
    //         console.log(searchByName)
    //         setSearchName(searchByName)
    //     } else {
    //         setSearchName('')
    //     }
    // }

    useEffect(() => {
        if (showUpcomingOnly) {
            setUpcoming("/upcoming")
            setPage(1)
            localStorage.setItem('page', page.toString());
            setSelectedOption('')
            setSearchName('')
            setSearchByName('')
            setFilter('')
            setFilterLaunchDate('')
        } else {
            setUpcoming('')
            setSearchName('')
            setSearchByName('')
        }
    }, [page, setFilterLaunchStatus, setPage, setSearchName, setUpcoming, showUpcomingOnly])

    useEffect(() => {
        const delay = 3000;
        const timer = setTimeout(() => {
            setSearchName(searchByName)
            setSearchByName(searchByName)
        }, delay);

        return () => {
            clearTimeout(timer);
        };

    }, [searchByName, setSearchName]);

    return (
        <div className={`row ${styles.filterMainDiv}`}>

            <div className="col-md-12 d-flex justify-content-md-end mb-3">
                <div className="form-check">
                    <input
                        className={`form-check-input ${styles.checkbox_border_color}`}
                        id="flexCheckChecked"
                        type="checkbox"
                        checked={showUpcomingOnly}
                        onChange={() => setShowUpcomingOnly(!showUpcomingOnly)}
                    />
                    <label className={`form-check-label ${styles.upcoming}`} htmlFor="flexCheckChecked">
                        Show upcoming only
                    </label>
                </div>
            </div>

            <div className="col-md-5 col-lg-4">
                <form
                    // onSubmit={handleSubmit}
                >
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchByName}
                            onChange={(e) => setSearchByName(e.target.value)}
                        />
                        <button
                            className={`${searchByName.length > 3 ? 'input-group-text bg-primary cursor-pointer' : 'input-group-text bg-primary pointer-event'}`}
                            type="submit"
                            // disabled={searchByName.length <= 3}
                        >
                            <img src={searchIcon} alt="search Icon"/>
                        </button>
                    </div>
                </form>
            </div>

            <div className="col-md-3 offset-md-1 offset-lg-2 offset-sm-0 col-12 my-3 my-md-0">
                <select
                    className={`form-select ${styles.filter_select}`}
                    aria-label="Default select example"
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value=''>By Launch Status</option>
                    <option value='false'>Failure</option>
                    <option value='true'>Success</option>
                </select>
            </div>

            <div className="col-md-3 col-12 ">
                <select
                    className={`form-select ${styles.filter_select}`}
                    aria-label="Default select example"
                    onChange={(e) => {
                        setFilter(e.target.value)
                        setFilterLaunchDate(e.target.value)
                    }}
                    value={filter}
                >
                    <option value=''>By Launch Date</option>
                    <option value="last_week">Last Week</option>
                    <option value="last_month">Last Month</option>
                    <option value="last_year">Last Year</option>
                </select>
            </div>

        </div>
    );
};

export default Filters;