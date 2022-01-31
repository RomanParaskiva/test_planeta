
const DateInput = ({ name, label, callback, initValue = null }) => {
    return (
        <div className="input__wrapper">
            <input
                autoComplete="off"
                onChange={callback}
                type={'date'}
                name={name}
                required
                placeholder={'Дата рождения'}
                value={initValue} />
            <label>{label}</label>
        </div>
    )
}

export default DateInput