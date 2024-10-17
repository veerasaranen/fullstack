import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import Details from './Details'
import userEvent from '@testing-library/user-event'

test('renders author and title, not likes nor url', () => {

  const user = {
    username: 'testUser',
    name: 'tester',
    password: 'salainen'
  }

  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'https://tests',
    user: user
  }

  // I only chose a specific part to not get the content that is not visible too

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.blogContent')

  expect(div).toHaveTextContent('TestTitle')

  expect(div).toHaveTextContent('TestAuthor')

  expect(div).not.toHaveTextContent('likes')

  expect(div).not.toHaveTextContent('https://tests')
})

test('shows likes and url after the button view has been clicked', async () => {

  const user = {
    username: 'testUser',
    name: 'tester',
    password: 'salainen'
  }

  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'https://tests',
    user: user
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const clicker = userEvent.setup()
  const viewButton = screen.getByText('view')

  await clicker.click(viewButton)
  const details = container.querySelector('.details')
  expect(details).not.toHaveStyle('display: none')

  expect(details).toHaveTextContent('Likes')
  expect(details).toHaveTextContent('https://tests')

})

test('like button works', async () => {

  const user = {
    username: 'testUser',
    name: 'tester',
    password: 'salainen'
  }

  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'https://tests',
    user: user
  }

  const like = vi.fn()

  const { container } = render(
    <div>
      <p>Url: { blog.url }</p>
      <p>Likes: { blog.likes }</p>
      <button onClick={like}>like</button>
      <p>Creator: { blog.user.name }</p>
    </div>
  )

  const clicker = userEvent.setup()

  const likeButton = screen.getByText('like')

  await clicker.click(likeButton)
  await clicker.click(likeButton)

  expect(like.mock.calls).toHaveLength(2)
})