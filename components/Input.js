import { useState } from "react"
const Input = ({ type = 'text', name, label, onChange, onClick, initValue }) => {
    const [value, setValue] = useState(initValue)

    console.log(initValue)
    
    const handleFocus = (e) => {
        e.target.removeAttribute('readonly')
    }

    const handleChange = ({target}) => {
        setValue(target.value)
        onChange(target)
    }
    return (
        <div className="input__wrapper">
            <input
                autoComplete="off"
                readOnly
                onFocus={handleFocus}
                onClick={onClick}
                onChange={handleChange}
                type={type}
                name={name}
                required
                placeholder={name}
                value={initValue} />
            <label>{label}</label>
        </div>
    )
}

export default Input