import { useState, useEffect } from "react"

import useHttp from '../hooks/http.hook'

import SelectWithPopup from "./SelectWithPopup"


const LocationSelects = ({ initValue, handleLocation }) => {


    const [countries, setCountries] = useState([]),
        [regions, setRegions] = useState([]),
        [cities, setCities] = useState([]),
        [location, setLocation] = useState(initValue),
        { request } = useHttp()


    useEffect(() => {
        getCountries()
    }, [])


    const getCountries = async (target) => {
        const body = JSON.stringify({
            "name": target?.value || '',
            "languageCode": "RU"
        })
        const res = await request('https://test.it-planet.org/location/country', 'POST', body)

        if (res) await setCountries(res.data)
    }

    const getRegions = async (target) => {
        const body = JSON.stringify({
            "name": target?.value || '',
            "languageCode": "RU",
            "countryId": location?.country?.wikiDataId
        })

        const res = await request('https://test.it-planet.org/location/region', 'POST', body)

        res && setRegions(res.data)
    }

    const getCities = async (target) => {
        const body = JSON.stringify({
            "name": target?.value || '',
            "languageCode": "RU",
            "countryId": location?.country?.wikiDataId,
            "regionCode": location?.region?.isoCode
        })
        const res = await request('https://test.it-planet.org/location/city', 'POST', body)

        res && setCities(res.data)
    }

    const countrySearch = ({ target }) => {
        if (target.value.length > 0) getCountries(target)
        if (target.value.length == 0 ) getCountries()
    }

    const countryClickHandle = async ({ target }) => {
        await setLocation({ ...location, country: countries.filter(item => item.wikiDataId === target.id)[0] })
    }

    const regionSearch = ({ target }) => {
        if (target.value.length > 2) getRegions(target)
        if (target.value.length < 2) getRegions()
    }

    const regionClickHandle = async ({ target }) => {
        await setLocation({ ...location, region: regions.filter(item => item.wikiDataId === target.id)[0] })
    }

    const citySearch = ({ target }) => {
        if (target.value.length > 2) getCities(target)
        if (target.value.length < 2) getCities()
    }

    const cityClickHandle = async ({ target }) => {
        setLocation({ ...location, city: cities.filter(item => item.wikiDataId === target.id)[0] })
        setTimeout(() => {
            handleLocation(location)
        }, 1000)
    }

    return (
        <>
            <SelectWithPopup
                searchClickHandler={countryClickHandle}
                search={countrySearch}
                data={countries}
                initValue={location?.country?.name || ''}
                name={'country'}
                label={'Страна'} />

            <SelectWithPopup
                searchClickHandler={regionClickHandle}
                search={regionSearch}
                data={regions}
                initValue={location?.region?.name || ''}
                name={'region'}
                label={'Регион'} />

            <SelectWithPopup
                searchClickHandler={cityClickHandle}
                search={citySearch}
                data={cities}
                initValue={location?.city?.name || ''}
                name={'city'}
                label={'Город'} />
        </>
    )
}

export default LocationSelects