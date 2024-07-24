/* eslint-disable react/prop-types */
import * as React from 'react';
import { getTopics } from '../../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../styles/navbar.css';

export const Navbar = ({ setParams }) => {
    const sortBy = ["created_at", "votes", "comment_count"];
    const orderBy = ["desc", "asc"];
    const [selectedTopic, setSelectedTopic] = React.useState([]);
    const [selectedSort, setSelectedSort] = React.useState('created_at');
    const [selectedOrder, setSelectedOrder] = React.useState('desc');
    const [searchParams, setSearchParams] = useSearchParams();
    const [topics, setTopics] = React.useState([]);
    const [errorMsg, setErrorMsg] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        getTopics()
        .then(({ topics }) => {
            setTopics(topics);
        })
        .catch((err) => {
            setErrorMsg(err.msg);
        });
    }, []);

    const handleApply = () => {
        const topic = selectedTopic.length ? selectedTopic.join(',') : '';
        setParams({ topic: topic, order: selectedOrder, sort_by: selectedSort });
        searchParams.set('sort_by', selectedSort);
        searchParams.set('order', selectedOrder);
        setSearchParams(searchParams);
        let urlQuery = '';
        if (topic) urlQuery += `/topics/${topic}?${searchParams.toString()}`;
        else urlQuery += `/articles?${searchParams.toString()}`;
        navigate(urlQuery);
    }

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
            {!errorMsg ? (
                <>
                    <h3>View All Articles</h3>
                    <div className="filter-section">
                        <h4>Filter Articles By</h4>
                        {topics.map((topic) => (
                            <div key={topic.slug} className="filter-item">
                                <input
                                    type="checkbox"
                                    value={topic.slug}
                                    onChange={handleTopicChange}
                                    id={`filter-${topic.slug}`}
                                />
                                <label htmlFor={`filter-${topic.slug}`}>{topic.slug[0].toUpperCase()+topic.slug.slice(1,topic.slug.length)}</label>
                            </div>
                        ))}
                    </div>
                    <div className="sort-section">
                        <h4>Sort Articles By</h4>
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
                                <label htmlFor={`sort-${sort}`}>{sort === 'created_at' ? 'Created At' : sort === 'votes' ? 'Votes' : sort === 'comment_count' ? 'Comments' : null}</label>
                            </div>
                        ))}
                    </div>
                    <div className="order-section">
                        <h4>Order Articles By</h4>
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
                    <button className="apply-button" onClick={handleApply}>Apply</button>
                </>
            ) : (
                <p>{errorMsg}</p>
            )}
        </div>
    );
}
