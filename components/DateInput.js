
const DateInput = ({ callback, initValue = null }) => {
    return (
        <div className="input__wrapper">
            <input
                autoComplete="off"
                onChange={callback}
                type={'date'}
                name={'dateBirth'}
                required
                placeholder={'Дата рождения'}
                value={initValue ? initValue : ''} />
            <label>{'Дата рождения'}</label>
        </div>
    )
}

export default DateInput