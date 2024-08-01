/* eslint-disable react/prop-types */
import '../../styles/articles-per-page.css';

const ArticlesPerPage = ({ limit, setLimit, totalCount }) => {
    const options = [];
    for (let i = 5; i <= totalCount; i += 5) {
        options.push(i);
    }
    if (totalCount % 5 !== 0) {
        options.push(totalCount);
    }

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value, 10));
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
