import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let container
  const mockAddLike = jest.fn()
  const mockDelBlog = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'testing jest with react',
      author: 'me',
      id: '0000000',
      url: 'http://example.com',
      likes: 0,
      user: { username: 'TESTER' }
    }

    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        username='test'
        addLike={mockAddLike}
        delBlog={mockDelBlog}
      />
    ).container

  })

  test('Only render title and author by default', () => {
    const div = container.querySelector('.switchable-content')
    expect(div).toHaveStyle('display: none')
  })

  test('Display url and likes when button clicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('div > button')

    await user.click(button)

    const div = container.querySelector('.switchable-content')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Function called twice when like button clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')

    await user.dblClick(button)

    expect(mockAddLike.mock.calls).toHaveLength(2)
  })
})