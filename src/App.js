import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogCreationForm from './components/BlogCreation'
import Togglable from './components/Togglable'
import LoginForm from './components/Login'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const defaultMsg = { text: '', type: '' }

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(defaultMsg)

  const createBlogRef = useRef()

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
      const newMsg = { text: err.response.data.error, type: 'error' }
      setMsg(newMsg)
      setTimeout(() => setMsg(defaultMsg), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (blogData) => {
    try {
      const result = await blogService.create(blogData)
      getBlogs()
      createBlogRef.current.toggleVisibility()

      const newMsg = { text: `Successfully created : ${result.title}`, type: 'success' }
      setMsg(newMsg)
      setTimeout(() => setMsg(defaultMsg), 7000)
    }
    catch (err) {
      const newMsg = { text: err.response.data.error, type: 'error' }
      setMsg(newMsg)
      setTimeout(() => setMsg(defaultMsg), 5000)
    }
  }

  const addLike = async (blogData) => {
    try {
      await blogService.update(blogData)
      getBlogs()
    }
    catch (err) {
      const newMsg = { text: err.response.data.error, type: 'error' }
      setMsg(newMsg)
      setTimeout(() => setMsg(defaultMsg), 5000)
    }
  }

  const delBlog = async (blogData) => {
    try {
      await blogService.remove(blogData.id)
      getBlogs()

      const newMsg = { text: `Successfully deleted : ${blogData.title}`, type: 'success' }
      setMsg(newMsg)
      setTimeout(() => setMsg(defaultMsg), 7000)
    }
    catch (err) {
      const newMsg = { text: err.response.data.error, type: 'error' }
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
        <h1>Blogs</h1>
        <p>Welcome {user.username} <button onClick={handleLogout}>logout</button></p>

        <Togglable showLabel="new blog" hideLabel="cancel" ref={createBlogRef}>
          <h2>Create new blog</h2>
          <BlogCreationForm createBlog={createBlog} />
        </Togglable>

        <h2>Blog list</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              username={user.username}
              addLike={addLike}
              delBlog={delBlog}
            />)}
      </>
    )
  }
}

export default App