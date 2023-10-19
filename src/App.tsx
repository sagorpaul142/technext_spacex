import {SpaceXLaunchesProvider} from "./context/SpaceXLaunchesContext.tsx";
import {RouterProvider} from "react-router-dom";
import routes from "./routing/routes.tsx";

const App = () => {
    return (
        <SpaceXLaunchesProvider>
            <RouterProvider router={routes} />
        </SpaceXLaunchesProvider>
    );
};

export default App;