const Input = ({ type, name, label, callback }) => {

    const handleFocus = (e) => {
        e.target.removeAttribute('readonly')
    }
    return (
        <div className="input__wrapper">
            <input
                autoComplete="off"
                readOnly
                onFocus={handleFocus}
                onChange={callback}
                type={type}
                name={name}
                required
                placeholder={name} />
            <label>{label}</label>
        </div>
    )
}

export default Input