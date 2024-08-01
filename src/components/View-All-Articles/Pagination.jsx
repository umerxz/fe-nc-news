/* eslint-disable react/prop-types */
import '../../styles/pagination.css';

const Pagination = ({ page, setPage, totalCount, limit, setSearchParams }) => {
    const totalPages = Math.ceil(totalCount / limit);

    const getPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, page + 2);

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) {
                pageNumbers.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    const handlePageClick = (pageNumber) => {
        if (pageNumber === '...') return;
        setPage(pageNumber);
        setSearchParams((prevParams) => {
            prevParams.set('page', pageNumber);
            return prevParams;
        });
    };

    const handleNextPageClick = () => {
        if (page < totalPages) {
            setPage(page + 1);
            setSearchParams((prevParams) => {
                prevParams.set('page', page + 1);
                return prevParams;
            });
        }
    };

    const handlePreviousPageClick = () => {
        if (page > 1) {
            setPage(page - 1);
            setSearchParams((prevParams) => {
                prevParams.set('page', page - 1);
                return prevParams;
            });
        }
    };

    return (
        <div className="pagination-container">
            <button onClick={handlePreviousPageClick} disabled={page === 1}>
                Previous
            </button>
            {getPageNumbers().map((pageNumber, index) => (
                <button
                    key={index}
                    onClick={() => handlePageClick(pageNumber)}
                    className={page === pageNumber ? 'active' : ''}
                    disabled={pageNumber === '...'}
                >
                    {pageNumber}
                </button>
            ))}
            <button onClick={handleNextPageClick} disabled={page === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
