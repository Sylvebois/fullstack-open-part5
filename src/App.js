import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import BlogZone from './components/Blog'
import LoginForm from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const defaultMsg = { text: '', type: '' };

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [msg, setMsg] = useState(defaultMsg);

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (err) {
      const newMsg = { text: err.response.data.error, type: 'error'}
      setMsg(newMsg)
      setTimeout(() => setMsg(defaultMsg), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()

    try {
      const result = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      })

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      getBlogs()

      const newMsg = { text: `Successfully created : ${result.title}`, type: 'success'}
      setMsg(newMsg)
      setTimeout(() => setMsg(defaultMsg), 7000)
    }
    catch (err) {
      const newMsg = { text: err.response.data.error, type: 'error'}
      setMsg(newMsg)
      setTimeout(() => setMsg(defaultMsg), 5000)
    }
  }

  useEffect(() => { getBlogs() }, [])

  useEffect(() => {
    const rawData = window.localStorage.getItem('loggedUser')
    
    if (rawData) {
      const user = JSON.parse(rawData)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <>
        <Notification
          message={msg.text}
          type={msg.type}
        />
        <LoginForm
          username={username}
          password={password}
          handlePassword={setPassword}
          handleUsername={setUsername}
          handleClick={handleLogin}
        />
      </>
    )
  }
  else {
    return (
      <>
        <Notification
          message={msg.text}
          type={msg.type}
        />
        <BlogZone
          blogs={blogs}
          username={user.username}
          blogTitle={blogTitle}
          blogAuthor={blogAuthor}
          blogUrl={blogUrl}
          handleBlogTitle={setBlogTitle}
          handleBlogAuthor={setBlogAuthor}
          handleBlogUrl={setBlogUrl}
          handleAddBlog={handleAddBlog}
          handleLogout={handleLogout}
        />
      </>
    )
  }
}

export default App