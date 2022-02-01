import { useState, useEffect, useContext } from "react"
import userContext from "../../context/userContext"
import useHttp from '../../hooks/http.hook'
import Link from "next/link"
import Header from '../../components/Header'
import Input from '../../components/Input'
import Select from '../../components/Select'
import SelectWithPopup from '../../components/SelectWithPopup'



const Home = () => {
    const { appUser: { user, statuses, getCountries, getRegions, getCities } } = useContext(userContext),
        [form, setForm] = useState(
            {
                "firstname": user?.firstname || null,
                "lastname": user?.lastname || null,
                "patronymic": user?.patronymic || null,
                "sex": user?.sex || null,
                "birthDate": user?.birthDate || null,
                "personStatusId": 1,
                "languageCode": "RU",
                "location": {
                    "languageCode": "RU",
                    "country": user?.country || null,
                    "region": user?.region || null,
                    "city": user?.city || null
                }
            })

    console.log(user)

    useEffect(() => {
        user && setForm(user)
    }, [user])
    const handleForm = async (target) => {
        await setForm({ ...form, [target.name]: target.value })
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
                                            <span>{form.firstname}</span>
                                            <span>{form.lastname}</span>
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
                                <Input name={'fistname'} label={'Имя'} initValue={form.firstname || ''} onChange={handleForm} />
                                <Input name={'lastname'} label={'Фамилия'} initValue={form.lastname || ''} onChange={handleForm} />
                                <Input name={'patronymic'} label={'Отчество'} initValue={form.patronymic || ''} onChange={handleForm} />
                                <Select name={'sex'} label={'Пол'} onChange={handleForm} initValue={form.sex || null} variants={['Женщина', 'Мужчина']} defaultVariant={'Другого не дано'} />
                                <Input type={'date'} name={'birthDate'} label={'Дата рождения'} onChange={handleForm} initValue={form.birthDate || new Date()} />
                                <Select name={'personStatusId'} label={'Статус'} onChange={handleForm} initValue={form.personStatusId || null} variants={['Школьник', 'Студент', 'Специалист']} defaultVariant={''} />

                                <SelectWithPopup name={'country'} label={'Страна'} getData={getCountries} initValue={form.location.country || null} />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home


