import { useState, useContext } from "react"
import userContext from "../../context/userContext"

import Link from "next/link"
import Header from '../../components/Header'
import UserData from "../../components/core/UserData"
import UserSkills from "../../components/core/UserSkills"



const Home = () => {
    const { appUser: { user } } = useContext(userContext),
        [userDataOpen, setUserDataOpen] = useState(false),
        [userSkillsOpen, setUserSkillsOpen] = useState(false)


    const handleUserData = async () => {
        userSkillsOpen ? await setUserSkillsOpen(!userSkillsOpen) : ''
        await setUserDataOpen(!userDataOpen)
    }

    const handleUserSkills = async () => {
        userDataOpen ? setUserDataOpen(!userDataOpen) : ''
        await setUserSkillsOpen(!userSkillsOpen)
    }

    if (!user) {
        return (
            <div className="container">
                <img src="/loading-fast.gif" width={200} />
            </div>
        )
    } else {
        return (
            <>
                <div className="profile-container">

                    <div className="user">
                        <Header />
                        <div className="wrapper">
                            <div className="menu">
                                <Link href={'/'}>Регистрация</Link>
                                <Link href={'/core/'}>Личный кабинет</Link>
                            </div>

                            <div className="user__info">
                                <div className="user__info-top">
                                    <div className="avatar upload">
                                        <div className="circle">+</div>
                                    </div>

                                    <div className="info">
                                        <div className="name">
                                            <span>{user.firstname}</span>
                                            <span>{user.lastname}</span>
                                        </div>
                                        <div className="place">
                                            <img src={'/RU.png'} alt="RU" />
                                            <span>Москва</span>
                                        </div>
                                    </div>

                                    <div className="rating">
                                        <img src="star.png" alt="star" />
                                        <span>4</span>
                                    </div>
                                </div>

                                <div className="message">
                                    <span>Заполните профиль</span>
                                </div>

                                <div className="btns__wrapper">
                                    <button onClick={handleUserData}>Личные данные</button>
                                    <button onClick={handleUserSkills}>Навыки</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <UserData userDataOpen={userDataOpen} handleUserData={handleUserData} />

                    <UserSkills userSkillsOpen={userSkillsOpen} handleUserSkills={handleUserSkills} />
                </div>
            </>
        )
    }
}

export default Home


