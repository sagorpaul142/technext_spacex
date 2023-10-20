import {useContext} from 'react';
import {SpaceXLaunchesContext} from "../../context/SpaceXLaunchesContext.tsx";
import {SpaceXLaunchesContextType} from "../../Services/SpaceList.ts";

const Pagination = () => {
    const {total, limit, page, setPage, setOffset} = useContext(SpaceXLaunchesContext) as SpaceXLaunchesContextType

    const goToTop = () => {
        window.scrollTo({
            top: 200,
            behavior: 'smooth',
        });
    };

    return (
        <nav className="mt-4 d-flex justify-content-center">
            <ul className="pagination">
                {
                    total > 0 &&
                    <li className={`${page > 1 ? 'page-item cursor-pointer' : 'page-item pointer-event'}`}>
                        <span
                            className="page-link"
                            onClick={() => {
                                if (page > 1) {
                                    localStorage.setItem('page', String(page - 1));
                                    setPage(page - 1);
                                    setOffset((page * limit) - 9)
                                    goToTop();
                                }
                            }}
                        >
                            &lt;
                        </span>
                    </li>
                }
                {
                    Array.from(Array(Math.ceil(total / limit) || 0)).map((_, index) => (
                        <li className="page-item" key={index}>
                            <a
                                className={`${index + 1 === page ? 'active page-link cursor-pointer' : 'page-link cursor-pointer'}`}
                                href={void 0}
                                onClick={() => {
                                    localStorage.setItem('page', String(index + 1));
                                    setPage(index + 1)
                                    setOffset(((index + 1) * limit) - 9)
                                    goToTop()
                                }}
                            >
                                {index + 1}
                            </a>
                        </li>
                    ))
                }
                {
                    total > 0 &&
                    <li className={`${Math.ceil(total / limit) === page ? 'page-item pointer-event' : 'page-item cursor-pointer'}`}>
                        <span
                            className="page-link"
                            onClick={() => {
                                if (Math.ceil(total / limit) !== page) {
                                    localStorage.setItem('page', String(page + 1));
                                    setPage(page + 1);
                                    setOffset((page * limit) - 9)
                                    goToTop();
                                }
                            }}
                        >
                            &gt;
                        </span>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Pagination;