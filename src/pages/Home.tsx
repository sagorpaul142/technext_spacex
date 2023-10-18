import Header from "../components/Header/Header.tsx";
import Filters from "../components/Filter/Filters.tsx";
import SpaceCard from "../components/SpaceCard/SpaceCard.tsx";
import Footer from "../components/Footer/Footer.tsx";
const Home = () => {
    return (
        <div className="container">
            <Header />

            <Filters />

            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <SpaceCard />
                </div>
                <div className="col-lg-4 col-md-6">
                    <SpaceCard />
                </div>
                <div className="col-lg-4 col-md-6">
                    <SpaceCard />
                </div>
                <div className="col-lg-4 col-md-6">
                    <SpaceCard />
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default Home;