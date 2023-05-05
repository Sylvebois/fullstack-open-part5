import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogData) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const update = async (blogData) => {
  const destUrl = `${baseUrl}/${blogData.id}`
  const config = { headers: { Authorization: token } }
  const response = await axios.put(destUrl, blogData, config)
  return response.data
}

const remove = async (blogId) => {
  const destUrl = `${baseUrl}/${blogId}`
  const config = { headers: { Authorization: token } }
  const result = await axios.delete(destUrl, config)
  return result.status
}

export default { getAll, setToken, create, update, remove }