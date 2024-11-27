import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  console.log(newObject)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/${newObject.blog.id}/comments`, newObject, config)
  return response.data
}

export default { getAll, create }
