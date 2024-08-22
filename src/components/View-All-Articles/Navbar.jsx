/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../styles/navbar.css';

export const Navbar = ({ setParams, topics, limit, page, resetFilters, setResetFilters, setLimit, setPage, setSearchParams }) => {
    const sortBy = ["created_at", "votes", "comment_count"];
    const orderBy = ["desc", "asc"];
    const [selectedTopic, setSelectedTopic] = React.useState([]);
    const [selectedSort, setSelectedSort] = React.useState('created_at');
    const [selectedOrder, setSelectedOrder] = React.useState('desc');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (resetFilters) {
            setSelectedTopic([]);
            setSelectedSort('created_at');
            setSelectedOrder('desc');
            setResetFilters(false);
        }
    }, [resetFilters]);

    React.useEffect(() => {
        const savedParams = JSON.parse(localStorage.getItem('appliedParams')) || {
            topic: [],
            sort_by: 'created_at',
            order: 'desc',
            limit: 10,
            page: 1
        };
        setSelectedTopic(savedParams.topic);
        setSelectedSort(savedParams.sort_by);
        setSelectedOrder(savedParams.order);
    }, []);

    const handleApply = () => {
        const appliedParams = {
            topic: selectedTopic,
            sort_by: selectedSort,
            order: selectedOrder,
            limit,
            page: 1
        };
        localStorage.setItem('appliedParams', JSON.stringify(appliedParams));

        setParams(appliedParams);
        setPage(1);
        navigate(`?topic=${selectedTopic.join(',')}&sort_by=${selectedSort}&order=${selectedOrder}&limit=${limit}&page=1`);
    };

    const handleTopicChange = (event) => {
        const value = event.target.value;
        setSelectedTopic(prev =>
            prev.includes(value)
                ? prev.filter(topic => topic !== value)
                : [...prev, value]
        );
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    const handleOrderChange = (event) => {
        setSelectedOrder(event.target.value);
    };

    if (!topics) return <h1>Fetching Topics...</h1>;

    return (
        <div className="navbar">
            <div className="input-row">
                <div className="filter-section">
                    <h4>Filter By</h4>
                    {topics.map((topic) => (
                        <div key={topic.slug} className="filter-item">
                            <input
                                type="checkbox"
                                value={topic.slug}
                                onChange={handleTopicChange}
                                id={`filter-${topic.slug}`}
                                checked={selectedTopic.includes(topic.slug)}
                            />
                            <label htmlFor={`filter-${topic.slug}`}>{topic.slug[0].toUpperCase() + topic.slug.slice(1)}</label>
                        </div>
                    ))}
                </div>
                <div className="sort-section">
                    <h4>Sort By</h4>
                    {sortBy.map((sort) => (
                        <div key={sort} className="sort-item">
                            <input
                                type="radio"
                                name="sort"
                                value={sort}
                                checked={selectedSort === sort}
                                onChange={handleSortChange}
                                id={`sort-${sort}`}
                            />
                            <label htmlFor={`sort-${sort}`}>{sort === 'created_at' ? 'Created At' : sort === 'votes' ? 'Votes' : 'Comments'}</label>
                        </div>
                    ))}
                </div>
                <div className="order-section">
                    <h4>Order By</h4>
                    {orderBy.map((order) => (
                        <div key={order} className="order-item">
                            <input
                                type="radio"
                                name="order"
                                value={order}
                                checked={selectedOrder === order}
                                onChange={handleOrderChange}
                                id={`order-${order}`}
                            />
                            <label htmlFor={`order-${order}`}>{order === 'asc' ? 'Ascending' : 'Descending'}</label>
                        </div>
                    ))}
                </div>
            </div>
            <button className="apply-button" onClick={handleApply}>Apply</button>
        </div>
    );
};
