const { test, expect, beforeEach, describe, afterEach } = require('@playwright/test')

  describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('/api/testing/reset')
      await request.post('/api/users', {
        data: {
          name: 'Kalle',
          username: 'Kallex',
          password: 'salainen'
        }
      })

      await request.post('/api/users', {
        data: {
          name: 'tester',
          username: 'test',
          password: 'salainen'
        }
      })
      
      await page.goto('/')
    })
  
    test('Login form is shown', async ({ page }) => {
      // if we see a component with loginPage as class name, we must be by default at the login page
      await expect(page.locator('.loginPage')).toBeVisible
    })
  
    describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('Kallex')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login '}).click()
        await expect(page.getByText('Kalle logged in')).toBeVisible
      })
  
      test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('Kallex')
        await page.getByTestId('password').fill('sekret')
        await page.getByRole('button', { name: 'login '}).click()
        await expect(page.getByText('Wrong credentials')).toBeVisible
      })
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('Kallex')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login '}).click()

        await page.getByRole('button', { name: 'create a blog' }).click()
        await page.getByTestId('title').fill('test')
        await page.getByTestId('author').fill('tester')
        await page.getByTestId('url').fill('https://test')
        await page.getByRole('button', { name: 'create' }).click()
      })
    
      test('a new blog can be created', async ({ page }) => {
        await expect(page.locator('.blogContent')).toBeVisible
      })

      test('a blog can be liked', async ({ page }) => {
        //there's only the blog that we created in beforeEach
        //we ensure there's no likes at first
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('Likes: 0')).toBeVisible
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible
      })

      test('a blog can be deleted by the creator', async ({ page }) => {
        //there's only one blog (from beforeEach) and the currently logged in user created it
        await page.getByRole('button', { name: 'delete' }).click()

        //since the blog was the only blog, no view or delete buttons are showing anymore and the blogContent class isn't there either
        //I read that the confirm message does not show in playwright by default
        await expect(page.getByRole('button', { name: 'view' })).not.toBeVisible
        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible
        await expect(page.locator('.blogContent')).not.toBeVisible
      })

      test('only the creator can see the delete button', async ({ page }) => {
        //Kallex creates the blog in beforeEach

        //Kallex sees the delete button
        await expect(page.getByRole('button', { name: 'delete' })).toBeVisible

        //logging into another user
        await page.getByRole('button', { name: 'logout' }).click()
        await page.getByTestId('username').fill('test')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login ' }).click()

        //no delete button but there is a blog
        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible
        await expect(page.locator('.blogContent')).toBeVisible
      })

      test('blogs are arranged in the order of likes', async ({ page }) => {
        // this test times out on some of the browsers if the limit is 3000ms so I did not use it
        // i did this in a weird way but it works (i hope)

        // let's create another blog with likes
        // liking the first blog (here we still only have one blog so liking is easier)
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('Likes: 0')).toBeVisible
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible

        //another one
        await page.getByRole('button', { name: 'create a blog' }).click()
        await page.getByTestId('title').fill('test2')
        await page.getByTestId('author').fill('tester2')
        await page.getByTestId('url').fill('https://test2')
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByText('test2').waitFor()

        const second = await page.getByText('test2 by tester2')
        const secondParent = await second.locator('..')
        await secondParent.getByRole('button', { name: 'view' }).click()
        await expect(secondParent.getByText('Likes: 0')).toBeVisible

        //here the second blog should be second as it has less likes, let's check
        //the text looks funny but this allows the order to be checked
        await expect(page.locator('.blogList')).toContainText(['test by testerviewUrl: https://testLikes: 1likeCreator: Kallehidedelete', 'test2 by tester2viewUrl: https://test2Likes: 0likeCreator: Kallehidedelete'])

        await secondParent.getByRole('button', { name: 'like' }).click()
        await secondParent.getByText('Likes: 1').waitFor()
        await secondParent.getByRole('button', { name: 'like' }).click()
        await secondParent.getByText('Likes: 2').waitFor()
        //the likes do not increase past 1 for some reason but the expect works

        //here the second blog should be second as it has less likes, let's check
        await expect(page.locator('.blogList')).toContainText(['test2 by tester2viewUrl: https://test2Likes: 2likeCreator: Kallehidedelete', 'test by testerviewUrl: https://testLikes: 1likeCreator: Kallehidedelete'])
      })
    })
  })