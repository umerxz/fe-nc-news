import '../../styles/form.css';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <main className='landing-page'>
        <div className='content'>
            <p className='info-text'>Click on Login if you already have an account.</p>
            <p className='info-text'>If you don&apos;t have an account, Sign up first.</p>
            <div className='button-group'>
            <Link to='/login'><button className='btn'>Login</button></Link>
            <Link to='/signup'><button className='btn'>Sign up</button></Link>
            </div>
        </div>
        </main>
    );
};
