import {useContext} from 'react'
import Header from "../components/Header/Header.tsx";
import Filters from "../components/Filter/Filters.tsx";
import SpaceCard from "../components/SpaceCard/SpaceCard.tsx";
import Footer from "../components/Footer/Footer.tsx";
import {SpaceXLaunchesContext} from "../context/SpaceXLaunchesContext.tsx";
import CardSkeleton from "../components/skeleton/CardSkeleton.tsx";
import {SpaceXLaunchesContextType} from "../Services/SpaceList.ts";
import Pagination from "../components/Pagination/Pagination.tsx";
import Nodata from "../components/NoData/Nodata.tsx";


const Home = () => {
    const {launches, limit, loading} = useContext(SpaceXLaunchesContext) as SpaceXLaunchesContextType


    return (
        <>
            <div className="container">

                <Header/>

                <Filters/>

                {
                    loading && (
                        <div className="row">
                            {
                                Array.from(Array(limit)).map((_, index) => (
                                    <div className="col-lg-4 col-md-6" key={index}>
                                        <CardSkeleton/>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

                <div className="row">
                    {
                        launches.length === 0 ? <Nodata/> :
                            launches?.map((space, index) => (
                                <div className="col-lg-4 col-md-6" key={index}>
                                    <SpaceCard space={space}/>
                                </div>
                            ))
                    }
                </div>

                <Pagination/>

                <Footer/>

            </div>
        </>
    );
};

export default Home;