import { useEffect, useState } from 'react'

const Checkbox = ({ name, text, initValue = false, handleForm }) => {
  const [value, setValue] = useState(initValue || false)
  const handleChange = async (e) => {
    await setValue(!value)
    handleForm(e)
  }

  return (
    <div className="checkbox__wrapper">
      <label htmlFor={name}>
        <input onChange={handleChange} type="checkbox" id={name} name={name} checked={value} value={value} />
        <div className="checkbox-mimic">
          <img src="/chk-checked.svg" alt="" />
        </div>
        <span className='text' dangerouslySetInnerHTML={{ __html: text }}></span>
      </label>
    </div>
  )
}

export default Checkbox