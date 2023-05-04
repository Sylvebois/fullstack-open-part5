import { useState } from "react"

const Blog = ({ blog, username, addLike, delBlog }) => {
  const [visible, setVisible] = useState(false)

  const divStyle = {
    border: '1px solid black',
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    paddingRight: 2
  }

  const visibilitySwitch = { display: visible ? '' : 'none' }

  const removeButtonStyle = { backgroundColor: 'red' }

  const handleAddClick = async () => {
    await addLike({
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const handleDelClick = async () => {
    if (window.confirm(`Delete ${blog.title} ?`)) {
      await delBlog({
        id: blog.id,
        title: blog.title
      })
    }
  }

  return (
    <div style={divStyle}>
      <em>{blog.title}</em>&nbsp;
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'}
      </button>
      <div style={visibilitySwitch}>
        Author: {blog.author === '' ? 'Unknown' : blog.author}<br />
        URL: <a href={blog.url}>{blog.url}</a><br />
        Likes: {blog.likes} <button onClick={handleAddClick}>like</button><br />
        Created by: {blog.user.username}<br />
        {
          username === blog.user.username ?
            <button style={removeButtonStyle} onClick={handleDelClick}>
              remove
            </button> :
            null
        }

      </div>
    </div>
  )
}
export default Blog