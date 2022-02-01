import { useState, useEffect } from "react"

const Select = ({ name, label, onChange, initValue, variants, defaultVariant }) => {
    const [open, setOpen] = useState(false),
        [value, setValue] = useState(initValue)

    console.log(initValue)
    useEffect(() => {
        variants && getInitValue()
    }, [variants])

    const getInitValue = async () => {
        return await setValue(variants.filter((item, i) => { return i == initValue })[0])
    }

    const handleClick = async () => {
        await setOpen(!open)
    }

    const handleChange = async ({ target }) => {
        await setValue(variants[target.dataset.index])
        await setOpen(!open)
    }

    return (
        <div className={open ? 'select open' : 'select'}>

            <div className="input__wrapper">
                <input
                    autoComplete="off"
                    readOnly
                    onClick={handleClick}
                    onChange={onChange}
                    type={'text'}
                    name={name}
                    required
                    placeholder={name}
                    value={value} />
                <label>{label}</label>
            </div>
            <div className="variants">
                {variants.map((item, i) => {
                    return <div key={i} onClick={handleChange} data-index={i}>{item}</div>
                })}
                {defaultVariant ? <div>{defaultVariant}</div> : ''}
            </div>
        </div>
    )
}

export default Select