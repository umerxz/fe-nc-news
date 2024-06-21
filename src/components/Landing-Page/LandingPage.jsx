import '../../styles/form.css'
import { Link } from 'react-router-dom'

export const LandingPage = () =>{ 
    return (
        <main className='formbox'>
            <>
                <p>Click on Login if you already have an account.</p>
                <p>If you don&apos;t have an account, Sign up first.</p>
                <div>
                    <Link to='/Login' ><button className='btns'>Login</button></Link>
                    <Link to='/Signup'><button className='btns'>Sign up</button></Link>
                </div>
            </>
        </main>
    )
}