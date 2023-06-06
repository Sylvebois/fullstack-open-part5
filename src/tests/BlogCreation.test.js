import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogCreationForm from '../components/BlogCreation'

test('Receive the right info when creating new blog', async () => {
  const mockCreateBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogCreationForm createBlog={mockCreateBlog} />)

  const titleInput = screen.getByPlaceholderText('Lorem Ipsum')
  const authorInput = screen.getByPlaceholderText('John Doe')
  const urlInput = screen.getByPlaceholderText('https://www.example.com')
  const button = screen.getByText('add')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'Me')
  await user.type(urlInput, 'hi there')
  await user.click(button)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('Me')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('hi there')
})