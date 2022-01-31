import { useState, useEffect } from "react"

const SexSelect = ({ callback, initValue = null }) => {
    const [open, setOpen] = useState(false),
        [value, setValue] = useState(initValue == null ? '' : (initValue ? 'Мужчина' : 'Женщина'))

    useEffect(() => {
        handleClose()
    }, [])

    const handleClick = async ({ target }) => {
        await setOpen(!open)
    }

    const handleChange = async ({ target }) => {
        setValue(target.dataset.sex == 1 ? 'Мужчина' : 'Женщина')
        await setOpen(!open)
    }

    const handleClose = () => {
        
    }

    return (
        <div className={open ? 'select open' : 'select'}>
            <div className="input__wrapper">
                <input
                    autoComplete="off"
                    readOnly
                    onChange={callback}
                    type={'text'}
                    name={'sex'}
                    onClick={handleClick}
                    placeholder={'Пол'}
                    value={value} />
                <label>{'Пол'}</label>
            </div>
            <div className="variants">
                <div onClick={handleChange} data-sex="1">Мужчина</div>
                <div onClick={handleChange} data-sex="0">Женщина</div>
                <div>Другого не дано</div>
            </div>
        </div>
    )
}

export default SexSelect