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

const roundOff = (number: string, fraction = 2) => {
  return parseFloat(number).toFixed(fraction)
}

export { getCurrentUser, roundOff }
