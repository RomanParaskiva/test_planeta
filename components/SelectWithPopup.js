import { useState } from "react"

const SelectWithPopup = ({ searchClickHandler, search, data, initValue, name, label }) => {

    const [show, setShow] = useState(false)

    const handleClick = async () => {
        await setShow(!show)
    }

    const searchHandler = (e) => {
        searchClickHandler(e)
        handleClick()
    }

    return (
        <div className={open ? 'select-popup open' : 'select-popup'}>

            <div className="input__wrapper">
                <input
                    autoComplete="off"

                    readOnly
                    onClick={handleClick}
                    type={'text'}
                    name={name}
                    required
                    placeholder={name}
                    value={initValue} />
                <label>{label}</label>
            </div>
            <div className={show ? 'overlay show' : 'overlay'}>
                <div className="popup">
                    <div className="search-input__wrapper">
                        <input type={'text'} name="search" placeholder="Начните вводить" autoComplete="off" onChange={search} />
                        <div onClick={handleClick} className="close-popup">&times;</div>
                    </div>
                    <div className="search-result">
                        {data?.length > 0 ? data.map(item => {
                            return <div onClick={searchHandler} key={item.wikiDataId} id={item.wikiDataId}>{item.name}</div>
                        }) : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectWithPopup