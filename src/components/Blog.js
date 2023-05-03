import BlogCreationForm from "./BlogCreation"

const BlogZone = ({ blogs, username, handleLogout, blogTitle, blogAuthor, blogUrl, handleBlogTitle, handleBlogAuthor, handleBlogUrl, handleAddBlog }) =>
  <>
    <h1>Blogs</h1>
    <UserZone username={username} handleLogout={handleLogout} />

    <h2>Create new blog</h2>
    <BlogCreationForm
      blogTitle={blogTitle}
      blogAuthor={blogAuthor}
      blogUrl={blogUrl}
      handleBlogTitle={handleBlogTitle}
      handleBlogAuthor={handleBlogAuthor}
      handleBlogUrl={handleBlogUrl}
      handleAddBlog={handleAddBlog}
    />

    <h2>Blog list</h2>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </>

const UserZone = ({ username, handleLogout }) =>
  <p>Welcome {username} <button onClick={handleLogout}>logout</button></p>

const Blog = ({ blog }) => <div>{blog.author}, <em>{blog.title}</em></div>

export default BlogZone