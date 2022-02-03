import { useContext } from 'react' 
import userContext from '../context/userContext'
import Link from 'next/link'

const Header = () => {
    const { appUser: {user} } = useContext(userContext)
    return (
        <div className="header">
            <Link href={'/'}><span className='logo'>LOGO</span></Link>
            <div className='header__profile'>
                <img src='/ava.png' alt=''/>
                <span>{user.login}</span>
            </div>
        </div>
    )
}

export default Header