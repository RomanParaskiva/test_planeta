import { useEffect, useState } from 'react'

const StatusInput = ({name, label, callback, value, variants}) => {
  const [open, setOpen] = useState(false)
console.log(variants)
  

  const handleClick = async ({ target }) => {
    await setOpen(!open)
  }

  const handleChange = async ({ target }) => {
   
  }


  return (
    <div className={open ? 'select open' : 'select'}>
      <div className="input__wrapper">
        <input
          autoComplete="off"
          readOnly
          onChange={callback}
          type={'text'}
          name={name}
          onClick={handleClick}
          placeholder={label}
          value={value} />
        <label>{label}</label>
      </div>
      <div className="variants">
        {variants.length > 0 && variants.map(item => {
          return <div onClick={handleChange} data-id={item.id}>{item.name}</div>
        })}
      </div>
    </div>
  )
}

export default StatusInput