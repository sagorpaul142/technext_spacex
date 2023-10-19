import searchIcon from "../../assets/search_icon.png";
import styles from "./Filter.module.scss"
import React, {useContext, useEffect, useState} from "react";
import {SpaceXLaunchesContext} from "../../context/SpaceXLaunchesContext.tsx";
import {SpaceXLaunchesContextType} from "../../Services/SpaceList.ts";

const Filters = () => {
    const {setApiUrl, page, setPage} = useContext(SpaceXLaunchesContext) as SpaceXLaunchesContextType
    const [selectedOption, setSelectedOption] = useState('');
    const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(typeof event.target.value)
        setSelectedOption(event.target.value);
        if (event.target.value !== '') {
            setApiUrl(`?launch_success=${event.target.value}`)
            setPage(1)
            localStorage.setItem('page', page.toString());
        } else {
            setApiUrl('')
            setSelectedOption('');
        }
    };

    useEffect(() => {
        if (showUpcomingOnly) {
            setApiUrl("/upcoming")
            setPage(1)
            localStorage.setItem('page', page.toString());
            setSelectedOption('')
        } else {
            setApiUrl('')
        }
    }, [showUpcomingOnly])

    return (
        <div className={`row ${styles.filterMainDiv}`}>

            <div className="col-md-12 d-flex justify-content-md-end mb-3">
                <div className="form-check">
                    <input
                        className={`form-check-input ${styles.checkbox_border_color}`}
                        id="flexCheckChecked"
                        type="checkbox"
                        value=""
                        onChange={() => setShowUpcomingOnly(!showUpcomingOnly)}
                    />
                    <label className={`form-check-label ${styles.upcoming}`} htmlFor="flexCheckChecked">
                        Show upcoming only
                    </label>
                </div>
            </div>

            <div className="col-md-5 col-lg-4">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search..." aria-label="Username"
                           aria-describedby="basic-addon1"/>
                    <span className="input-group-text bg-primary cursor-pointer" id="basic-addon1">
                    <img src={searchIcon} alt="search Icon"/>
                </span>
                </div>
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
                >
                    <option value=''>By Launch Date</option>
                    <option value="">Last Week</option>
                    <option value="">Last Month</option>
                    <option value="">Last Year</option>
                </select>
            </div>

        </div>
    );
};

export default Filters;