import { useState, useEffect, useContext } from "react"
import userContext from "../../context/userContext"

import useHttp from "../../hooks/http.hook"
import Input from '../../components/Input'
import Select from '../../components/Select'
import LocationSelects from '../../components/LocationSelects'

const UserForm = () => {
    const { appUser: { user, statuses } } = useContext(userContext),
        [form, setForm] = useState({}),
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
        console.log(obj)
        await setForm({ ...form, location: {...obj} })
        console.log(form)
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