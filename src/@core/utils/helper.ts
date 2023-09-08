import baseConst from '../../data/const'
import axios from 'axios'

const getCurrentUser = async (token: any) => {
  try {
    const response = await axios.get(baseConst.apiUrl + 'user/', {
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error(error)
  }

  return false
}

const getForecastList = async (token: string | null, page: number, size: number) => {
  try {
    const response = await axios.get(`${baseConst.apiUrl}v1/forecast/?page=${page}&page_size=${size}`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const { data } = response
    
return data

    // setResponseData(results)
  } catch (error) {
    console.error(error)
  }
}

const roundOff = (number: string, fractionLength = 2) => {
  return parseFloat(number).toFixed(fractionLength)
}

function formatPrice(price: string, fractionLength = 2, symbol = '', suffix = '') {
  // Ensure the price is a number and fix it to two decimal points
  const fixedPrice = roundOff(price, fractionLength)

  // Split the number into its whole and fractional parts
  const [whole, fraction] = fixedPrice.split('.')

  // Add commas as thousands separators for the whole number part
  const withSeparators = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  
return `${symbol}${withSeparators}.${fraction}${suffix}`
}

export { getCurrentUser, roundOff, formatPrice, getForecastList }
