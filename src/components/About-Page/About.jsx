import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Link } from 'react-router-dom';
import '../../styles/about.css';

const About = () => {
    let { user } = useContext(UserContext);

    if (!user) {
        user = '';
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://platform.linkedin.com/badges/js/profile.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <main className='about-page'>
            <div className='about-content'>
                <h1 className='welcome-message'>Welcome {user.username ? user.username : 'Guest'}</h1>
                <section className='website-section'>
                    <h2 className='section-title'>About This Website</h2>
                    <p className='intro-text'>
                        This is my first ever Portfolio which allows users to view all Articles and Comments on the articles. Articles can be deleted and updated, and new Articles can also be posted. Comments have similar functionality, allowing you to post comment(s) on various Articles and updating or deleting the Comments. Articles and Comments can be up-voted or down-voted.
                    </p>
                    {
                        user ? 
                        <p className='intro-text'>
                            You can:
                        </p>
                        :
                        <p className='intro-text'>
                            To use or create your account, <Link className='click-here' to='/'>Click Here!</Link>
                        </p>
                    }
                    <ul className='features-list'>
                        <li>View All Articles</li>
                        <li>View a specific Article</li>
                        <li>Post a Comment on an Article</li>
                        <li>Up-vote/Down-vote an Article</li>
                        <li>Up-vote/Down-vote a Comment</li>
                        <li>Delete an Article of the logged in User</li>
                        <li>Delete Comment(s) on the logged in User&apos;s Article</li>
                    </ul>
                </section>
                <section className='author-section'>
                    <h2 className='section-title'>About The Author</h2>
                    <div className='author-content'>
                        <p className='intro-text'>
                            Hi, I&apos;m Umer Naseer, the creator of this website. I am passionate about web development and enjoy creating interactive web applications. Connect with me on LinkedIn!
                        </p>
                        <div 
                            className="badge-base LI-profile-badge" 
                            data-locale="en_US" 
                            data-size="medium" 
                            data-theme="light" 
                            data-type="VERTICAL" 
                            data-vanity="umerxz" 
                            data-version="v1">
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default About;
