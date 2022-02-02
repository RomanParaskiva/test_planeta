import { useState, useEffect, useContext } from "react"
import userContext from "../../context/userContext"

import useHttp from "../../hooks/http.hook"
import Input from '../../components/Input'
import Select from '../../components/Select'
import LocationSelects from '../../components/LocationSelects'

const UserForm = () => {
    const { appUser: { user, statuses } } = useContext(userContext),
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
        }),
        { request, loading } = useHttp()

    useEffect(() => {
        user && setForm({ ...user })
    }, [user])


    const handleForm = async (target) => {
        await setForm({ ...form, [target.name]: target.value })
    }

    const sendForm = async (e) => {
        e.preventDefault()
        form.languageCode = "RU"
        const res = request('https://test.it-planet.org/user/profile/personal', 'PUT', JSON.stringify({ ...form }))
        setForm(res)
    }

    const handleLocation = async (obj) => {
        await setForm({ ...form, location: obj })
    }

    return (
        <form>
            <Input name={'firstname'} label={'Имя'} initValue={form.firstname || ''} onChange={handleForm} />
            <Input name={'lastname'} label={'Фамилия'} initValue={form.lastname || ''} onChange={handleForm} />
            <Input name={'patronymic'} label={'Отчество'} initValue={form.patronymic || ''} onChange={handleForm} />
            <Select name={'sex'} label={'Пол'} onChange={handleForm} initValue={form.sex || ''} variants={[{name: 'Женщина'},{name: 'Мужчина'}]} defaultVariant={'Другого не дано'} />
            <Input type={'date'} name={'birthDate'} label={'Дата рождения'} onChange={handleForm} initValue={form.birthDate || new Date()} />
            <Select name={'personStatusId'} label={'Статус'} onChange={handleForm} initValue={form.personStatusId || ''} variants={statuses} defaultVariant={''} />

            <LocationSelects initValue={form.location || null} handleLocation={handleLocation} />

            <button className="btn btn-blue" type="submit" onClick={sendForm}>Сохранить</button>
        </form>
    )
}

export default UserForm