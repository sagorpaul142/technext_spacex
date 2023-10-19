import {useEffect, useState} from 'react'
import Header from "../components/Header/Header.tsx";
import Filters from "../components/Filter/Filters.tsx";
import SpaceCard from "../components/SpaceCard/SpaceCard.tsx";
import Footer from "../components/Footer/Footer.tsx";
import axios from "axios";
import {Space} from "../Services/SpaceList.ts";



const Home = () => {
    const [spaces, setSpaces] = useState<Space[]>([])
    const [limit] = useState<number>(9);
    const [total, setTotal] = useState<number>(0);

    const getAllSpaces = () => {
        axios.get<Space[]>(`https://api.spacexdata.com/v3/launches?limit=${limit}`)
            .then(res => {
                setSpaces(res?.data)
                setTotal(parseInt(res.headers['spacex-api-count']))
            }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllSpaces()
    }, [])

    console.log(spaces)
    console.log(total)

    return (
        <div className="container">
            <Header/>

            <Filters/>

            <div className="row">
                {
                    spaces.map((space, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <SpaceCard space={space}/>
                        </div>
                    ))
                }

            </div>

            <Footer/>

        </div>
    );
};

export default Home;