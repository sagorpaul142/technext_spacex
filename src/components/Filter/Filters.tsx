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
        searchName,
        setFilterLaunchDate
    } = useContext(SpaceXLaunchesContext) as SpaceXLaunchesContextType
    const [selectedOption, setSelectedOption] = useState('');
    const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        if (event.target.value !== '') {
            setFilterLaunchStatus(`?launch_success=${event.target.value}`)
            setPage(1)
            localStorage.setItem('page', String(1));
            setShowUpcomingOnly(false)
            setFilter('')
            setFilterLaunchDate('')
        } else {
            setFilterLaunchStatus('')
            setSelectedOption('');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchName(searchText)
        setPage(1)
        localStorage.setItem('page', String(1));
    }

    const handleClearSearch = () => {
        setSearchText('');
        setSearchName('')
        if (page > 1 && searchName) {
            setPage(1);
            localStorage.setItem('page', '1');
        }
    };

    useEffect(() => {
        if (showUpcomingOnly) {
            setUpcoming("/upcoming")
            setPage(1)
            localStorage.setItem('page', String(1));
            setSelectedOption('')
            setFilter('')
            setFilterLaunchDate('')
            setFilterLaunchStatus('')
        } else {
            setUpcoming('')
            setFilterLaunchDate('')
            setFilter('')
        }
    }, [page, showUpcomingOnly])

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
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control position-relative"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                            className={'input-group-text bg-primary cursor-pointer'}
                            type="submit"
                        >
                            <img src={searchIcon} alt="search Icon"/>
                        </button>
                        {
                            searchText && (
                                <div
                                    className={`${styles.clear_icon} position-absolute cursor-pointer`}
                                    onClick={handleClearSearch}
                                >
                                    &times;
                                </div>
                            )
                        }

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