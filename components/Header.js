import Link from 'next/link'

const Header = () => {
    return (
        <div className="header">
            <Link href={'/'}><span className='logo'>LOGO</span></Link>
            <nav>

            </nav>
        </div>
    )
}

export default Header