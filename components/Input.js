const Input = ({type, name, label, callback}) => {
    return (
        <div className="input__wrapper">
            <input onChange={callback} type={type} name={name} required placeholder={name} />
            <label>{label}</label>
        </div>
    )
}

export default Input