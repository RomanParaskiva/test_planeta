import Link from "next/link"


const Home = () => {
    return(
        <div className="profile-container">
            <div className="menu">
                <Link href={'/'}>Регистрация</Link>
                <Link href={'/core/'}>Личный кабинет</Link>
            </div>
        </div>
    )
}

export default Home