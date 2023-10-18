import searchIcon from "../../assets/search_icon.png";
import styles from "./Filter.module.scss"
const Filters = () => {
    return (
        <div className={`row ${styles.filterMainDiv}`}>
            
            <div className="col-md-12 d-flex justify-content-end mb-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            Show upcoming only
                        </label>
                </div>
            </div>
            
            <div className="col-md-4">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search..." aria-label="Username"
                           aria-describedby="basic-addon1"/>
                    <span className="input-group-text bg-primary cursor-pointer" id="basic-addon1">
                    <img src={searchIcon} alt="search Icon"/>
                </span>
                </div>
            </div>

            <div className="col-md-6 offset-md-2 d-flex justify-content-between">
                <select
                    className={`form-select ${styles.filter_select}`}
                    aria-label="Default select example">
                    <option selected>By Launch Status</option>
                    <option value="1">Failure</option>
                    <option value="2">Success</option>
                </select>

                <select className={`form-select ${styles.filter_select}`} aria-label="Default select example">
                    <option selected>By Launch Date</option>
                    <option value="1">Last Week</option>
                    <option value="2">Last Month</option>
                    <option value="3">Last Year</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;