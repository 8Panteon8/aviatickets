import locationsInstance, { Locations } from '../locations';
import { formatDate } from '../../helpers/date';
import api, { Api } from '../../service/apiService';

const countries = [{ code: 'RUS', name: 'Russia' }];
const cities = [{ country_code: 'RUS', name: 'Moscow', code: 'MS' }];
const airlines = [{ country_code: 'RUS', name: 'Airlines', code: 'AVIA' }]

jest.mock('../../service/apiService', () => {
  const mockApi = {
    countries: jest.fn(() => Promise.resolve([{ code: 'RUS', name: 'Russia' }])),
    cities: jest.fn(() => Promise.resolve([{ country_code: 'RUS', name: 'Moscow', code: 'MS' }])),
    airlines: jest.fn(() => Promise.resolve([{ country_code: 'RUS', name: 'Airlines', code: 'AVIA' }])),
  }

  return {
    Api: jest.fn(() => mockApi)
  }
})

const apiService = new Api()

describe('Location store tests', () => {
  beforeEach(() => {
    locationsInstance.countries = locationsInstance.serializeCountries(countries)
    locationsInstance.cities = locationsInstance.serializeCities(cities)
  })


  it('Check that locationInstance is intance of Location class', () => {
    locationsInstance.countries = locationsInstance.serializeCountries(countries)
  })

  it('Success Locations instance create', () => {
    const instance = new Locations(api, { formatDate })
    expect(instance.countries).toBe(null)
    expect(instance.shortCities).toEqual({})
    expect(instance.formatDate).toEqual(formatDate)
  })

  it('Check correct countries serialize', () => {
    const res = locationsInstance.serializeCountries(countries)
    const expecteDate = {
      RUS: { code: 'RUS', name: 'Russia' }
    }

    expect(res).toEqual(expecteDate)
  })

  it('Check countries serialize with incorrect data', () => {
    const res = locationsInstance.serializeCountries(null)
    const expecteDate = {}

    expect(res).toEqual(expecteDate)
  })

  it('Check correct cities serialize', () => {
    const res = locationsInstance.serializeCities(cities)
    const expectedData = {
      MS: { country_code: 'RUS', name: 'Moscow', code: 'MS', country_name: 'Russia', full_name: 'Moscow,Russia' }
    }

    expect(res).toEqual(expectedData)
  })

  it('Check correct get city name by code', () => {
    const res = locationsInstance.getCityNameByCode('MS')

    expect(res).toBe('Moscow')
  })

  it('Check correct init method call', () => {
    const instance = new Locations(apiService, { formatDate })
    expect(instance.init()).resolves.toEqual([countries, cities, airlines])
  })
})