import { useState, useEffect } from "react"

import useHttp from '../hooks/http.hook'


const SelectWithPopup = ({ name, label, initValue = null, getData }) => {


    const [countries, setCountries] = useState([]),
        [regions, setRegions] = useState([]),
        [cities, setCities] = useState([]),
        [open, setOpen] = useState(false),
        [location, setLocation] = useState({}),
        [show, setShow] = useState(false),
        { request } = useHttp()


    useEffect(() => {
        getCountries()
    }, [])

    const handleClick = async () => {
        await setShow(!show)
    }



    const getCountries = async (query) => {
        const body = JSON.stringify({
            "name": query,
            "languageCode": "RU"
        })
        const res = await request('https://test.it-planet.org/location/country', 'POST', body)

        if (res) await setCountries(res.data)
    }

    const getRegions = async (query) => {

        const body = JSON.stringify({
            "name": query?.name || '',
            "languageCode": "RU",
            "countryId": query?.countryId || ''
        })

        const res = await request('https://test.it-planet.org/location/region', 'POST', body)

        res && setRegions(res.data)
    }

    const getCities = async (query) => {
        const body = JSON.stringify({
            "name": query?.name || '',
            "languageCode": "RU",
            "countryId": query?.countryId || '',
            "regionCode": query?.regionCode
        })
        const res = await request('https://test.it-planet.org/location/city')

        res && setCities(res.data)
    }

    const countrySearch = ({ target }) => {
        getCountries(target.value)
    }

    const countryClickHandle = async ({ target }) => {
        await setLocation({ country: countries.filter(item => item.wikiDataId === target.id)[0] })
        console.log(location)
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
                    value={location?.country?.name || ''} />
                <label>{label}</label>
            </div>
            <div className={show ? 'overlay show' : 'overlay'}>
                <div className="popup">
                    <input type={'text'} name="search" placeholder="Начните вводить" onChange={countrySearch} />
                    {countries?.length > 0 && countries.map(item => {
                        return <div onClick={countryClickHandle} key={item.wikiDataId} id={item.wikiDataId}>{item.name}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default SelectWithPopup