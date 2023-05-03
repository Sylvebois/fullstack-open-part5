const BlogCreationForm = ({ blogTitle, blogAuthor, blogUrl, handleBlogTitle, handleBlogAuthor, handleBlogUrl, handleAddBlog }) =>
  <form>
    <div>
      Title:
      <input
        type="text"
        name="title"
        value={blogTitle}
        onChange={({ target }) => handleBlogTitle(target.value)}
      />
    </div>
    <div>
      Author:
      <input
        type="text"
        name="author"
        value={blogAuthor}
        onChange={({ target }) => handleBlogAuthor(target.value)}
      />
    </div>
    <div>
      Url:
      <input
        type="text"
        name="url"
        value={blogUrl}
        onChange={({ target }) => handleBlogUrl(target.value)}
      />
    </div>
    <div>
      <button type="submit" onClick={handleAddBlog}>add</button>
    </div>
  </form>

export default BlogCreationForm