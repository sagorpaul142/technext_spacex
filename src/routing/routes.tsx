import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.tsx";

const route = createBrowserRouter([
    {
        path: '/',
        element: '',
        errorElement: '',
        children: [
            {index:true, element: <Home />}
        ]
    }
])

export default route;