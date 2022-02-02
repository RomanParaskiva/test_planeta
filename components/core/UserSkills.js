import { useState, useContext } from "react"
import userContext from "../../context/userContext"
import useHttp from "../../hooks/http.hook"

const UserSkills = ({ userSkillsOpen, handleUserSkills }) => {

    const { appUser: { user, getUser } } = useContext(userContext),
        [searchData, setSearchData] = useState([]),
        [form, setForm] = useState({}),
        { request } = useHttp()

    const skillClickHandler = async ({ target }) => {
        await setForm({ name: target.innerHTML })
    }

    const skillsSearch = async ({ target }) => {
        const res = await request(`https://test.it-planet.org/user/skill?name=${target.value}`)
        await setSearchData(res.skills)

    }

    const addSkill = async (obj) => {
        const res = await request('https://test.it-planet.org/user/skill', 'POST', JSON.stringify(obj ? {...obj} : { ...form }))
        setForm({})
        await getUser()
    }

    const removeSkill = async ({ target }) => {
        const res = await request(`https://test.it-planet.org/user/skill/${target.parentElement.id}`, 'DELETE')
        await getUser()
    }

    const [show, setShow] = useState(false)

    const handleClick = async () => {
        await setShow(!show)
    }

    const searchHandler = (e) => {
        skillClickHandler(e)
        handleClick()
    }

    const handlePressButton = async ({code, target}) => {
        if(code == 'Enter') {
           await addSkill({name: target.value})
           target.value = ''
           console.log(form)
           await handleClick()
        }
    }


    return (
        <div className={!userSkillsOpen ? "user__skills" : "user__skills open"}>
            <div className="user__skills-top">
                <div onClick={handleUserSkills} className="close-data">
                    <span>&lt;</span>
                    <span>Закрыть</span>
                </div>

                <div className="user__data-title">
                    Навыки
                </div>
            </div>
            <div className="user__skills-body">
                <h4>
                    Навыки
                </h4>

                <div className="skills__wrapper">
                    {user && user.skills.map((item) => {
                        return <div key={item.id} id={item.id} className="skill">{item.name}<span onClick={removeSkill} className="delete-skill-btn">&times;</span></div>
                    })}
                </div>

                <div className={open ? 'select-popup open' : 'select-popup'}>

                    <div className="input__wrapper">
                        <input
                            autoComplete="off"
                            readOnly
                            onClick={handleClick}
                            type={'text'}
                            name={'skills'}
                            required
                            placeholder={'Добавить категорию'}
                            value={form?.name || ''} />
                        <label>{'Добавить категорию'}</label>
                    </div>
                    <div className={show ? 'overlay show' : 'overlay'}>
                        <div className="popup">
                            <div className="search-input__wrapper">
                                <input type={'text'} name="search" placeholder="Начните вводить" autoComplete="off" onChange={skillsSearch} onKeyPress={handlePressButton}/>
                                <div onClick={handleClick} className="close-popup">&times;</div>
                            </div>
                            <div className="search-result">
                                {searchData.length > 0 ? searchData.map(item => {
                                    return <div onClick={searchHandler} key={item.id} id={item.id}>{item.name}</div>
                                }) : ''}
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={addSkill} className="btn btn-blue">Добавить</button>
            </div >
        </div>
    )
}

export default UserSkills