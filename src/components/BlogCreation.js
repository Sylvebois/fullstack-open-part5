import { useState } from 'react'

const BlogCreationForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleClick = async (e) => {
    e.preventDefault()

    await createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form>
      <div>
        Title:
        <input
          type="text"
          name="title"
          value={blogTitle}
          placeholder="Lorem Ipsum"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          name="author"
          value={blogAuthor}
          placeholder="John Doe"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          name="url"
          value={blogUrl}
          placeholder="https://www.example.com"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleClick}>add</button>
      </div>
    </form>
  )
}

export default BlogCreationForm