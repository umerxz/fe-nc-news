import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { ArticlesPage } from './ArticlesPage';
import { Link } from 'react-router-dom';

export const MyArticles = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <h1 style={{ fontSize: '2rem' }}>Please <Link to='/login' style={{ fontSize: '2rem', textDecoration: 'underline' }}>Login</Link> to gain access to NC News</h1>;
    }

    return (
        <ArticlesPage 
            author={user.username} 
            customTitle="Explore your articles"
            customMessage="You have not posted any Articles yet! Contribute to the community by creating a article."
        />
    );
};
