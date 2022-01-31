import { useState, useEffect, useContext } from "react"
import userContext from "../../context/userContext"
import useHttp from '../../hooks/http.hook'
import Link from "next/link"
import Header from '../../components/Header'
import Input from '../../components/Input'
import SexSelect from '../../components/SexSelect'
import DateInput from '../../components/DateInput'
import StatusInput from "../../components/StatusInput"



const Home = () => {
    const { user, statuses } = useContext(userContext),
    [form, setForm] = useState({})

    console.log(user)

    const handleForm = async (e) => {
        await setForm({ ...form, [e.target.name]: e.target.value })
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
                                    <button>Личные данные</button>
                                    <button>Навыки</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="user__data">
                        <div className="user__data-top">
                            <div className="close-data">
                                <span>&lt;</span>
                                <span>Закрыть</span>
                            </div>

                            <div className="user__data-title">
                                Личные данные
                            </div>
                        </div>
                        <div className="user__profile">
                            <div className="title">
                                Если ты заполнишь это поле, то получишь возможности общаться с людьми, получать бонусы
                            </div>
                            <form>
                                <Input name={'fistname'} label={'Имя'} value={user.firstname || ''} callback={handleForm} />
                                <Input name={'lastname'} label={'Фамилия'} value={user.lastname || ''} callback={handleForm} />
                                <Input name={'patronymic'} label={'Отчество'} value={user.patronymic || ''} callback={handleForm} />
                                <SexSelect  callback={handleForm}/>
                                <DateInput name={'birthDate'} label={'Дата рождения'}  callback={handleForm} value={user.birthDate || new Date()}/>
                                <StatusInput name={'personStatusId'} label={'Статус'} value={user.personStatusId || ''} variants={statuses} />
                                <Input name={'lastname'} label={'Имя'} value={user.firstname} />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home


