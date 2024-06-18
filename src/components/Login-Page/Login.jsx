import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Link } from 'react-router-dom';
import '../../styles/login.css'

const Login = () => {
    let {user} = useContext(UserContext)
    if (!user) {
        return <div>Loading...</div>;
    }
    user = user.data.user
    return (
        <main className='login'>
            <h1 >Welcome {user.username}</h1>
            <p>This is my first ever Portfolio which allows users to view all Articles and Comments on the articles. Articles can be deleted and updated, and new Articles can also be posted. Comments have similar functionality, allowing you to post comment(s) on various Articles and updating or deleting the Comments. Articles and Comments can be up-voted or down-voted.</p>
            <p>You can only log in as a default user <em>{user.username}</em> , from where you can:</p>
            <ul>
                <li>View All Articles</li>
                <li>View a specific Article</li>
                <li>Post a Comment on an Article </li>
                <li>Up-vote/Down-vote an Article</li>
                <li>Up-vote/Down-vote a Comment</li>
                <li>Delete an Article of the logged in User</li>
                <li>Delete Comment(s) on the logged in User&apos;s Article</li>
            </ul>
            <Link to="/articles">
                <button>Continue As {user.username}</button>
            </Link>    
        </main>
    )

}
export default Login