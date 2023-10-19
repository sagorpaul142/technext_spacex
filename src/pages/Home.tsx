import {useContext} from 'react'
import Header from "../components/Header/Header.tsx";
import Filters from "../components/Filter/Filters.tsx";
import SpaceCard from "../components/SpaceCard/SpaceCard.tsx";
import Footer from "../components/Footer/Footer.tsx";
import {SpaceXLaunchesContext} from "../context/SpaceXLaunchesContext.tsx";


const Home = () => {
    const {launches } = useContext(SpaceXLaunchesContext)

    return (
        <>
            <div className="container">
                <Header/>

                <Filters/>

                <div className="row">
                    {
                        launches.map(space => (
                            <div className="col-lg-4 col-md-6" key={space?.flight_number}>
                                <SpaceCard space={space}/>
                            </div>
                        ))
                    }

                </div>

                <Footer/>

            </div>
        </>
    );
};

export default Home;