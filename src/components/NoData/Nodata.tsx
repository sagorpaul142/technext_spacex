import NoDataImage from "../../assets/Nodata.gif"
const Nodata = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <img src={NoDataImage} className="img-fluid" alt=""/>
            <p className="fs-4">No data has been added yet!</p>
        </div>
    );
};

export default Nodata;