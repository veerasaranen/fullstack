import axios from 'axios'
const baseUrl = '/api/users'

const view = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default view