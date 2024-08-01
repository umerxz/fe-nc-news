/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import '../../styles/articles-per-page.css';

const ArticlesPerPage = ({ limit, setLimit, totalCount, setSearchParams }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const opts = [];
        for (let i = 5; i <= totalCount; i += 5) {
            opts.push(i);
        }
        opts.push(totalCount % 5 === 0 ? totalCount : totalCount + (5 - (totalCount % 5)));
        setOptions(opts);
    }, [totalCount]);

    const handleLimitChange = (event) => {
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit);
        setSearchParams((prevParams) => {
            prevParams.set('limit', newLimit);
            prevParams.set('page', 1);
            return prevParams;
        });
    };

    return (
        <div className="articles-per-page-container">
            <label htmlFor="articles-per-page">Articles per page: </label>
            <select
                id="articles-per-page"
                value={limit}
                onChange={handleLimitChange}
            >
                {options.map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ArticlesPerPage;
