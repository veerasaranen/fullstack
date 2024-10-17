import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('< BlogForm /> at least somehow adds a new blog', async () => {
  const createBlog = vi.fn()
  const setNotification = vi.fn()
  const actor = userEvent.setup()

  const user = {
    username: 'TestUser',
    name: 'Tester',
    password: 'salainen'
  }

  render(<BlogForm createBlog={createBlog} user={user} setNotification={setNotification} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('create')

  await actor.type(title, 'testing a form')
  await actor.type(author, 'tester')
  await actor.type(url, 'https://formTester')
  await actor.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form')
  expect(createBlog.mock.calls[0][0].author).toBe('tester')
  expect(createBlog.mock.calls[0][0].url).toBe('https://formTester')
})