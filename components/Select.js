import { useState, useEffect } from "react"

const Select = ({ name, label, onChange, initValue, variants, defaultVariant }) => {
    const [open, setOpen] = useState(false),
        [value, setValue] = useState(initValue)

    const handleClick = async () => {
        await setOpen(!open)
    }

    const handleChange = async ({ target }) => {
        await setValue(target.dataset.index)
        await setOpen(!open)
        onChange({name, value: target.dataset.index})
    }

    return (
        <div className={open ? 'select open' : 'select'}>

            <div className="input__wrapper">
                <input
                    autoComplete="off"
                    readOnly
                    onClick={handleClick}
                    type={'text'}
                    name={name}
                    required
                    placeholder={name}
                    value={value ? variants[value].name : ''} />
                <label>{label}</label>
            </div>
            <div className="variants">
                {variants.map((item, i) => {
                    return <div key={i} onClick={handleChange} data-index={i}>{item.name}</div>
                })}
                {defaultVariant ? <div>{defaultVariant}</div> : ''}
            </div>
        </div>
    )
}

export default Select