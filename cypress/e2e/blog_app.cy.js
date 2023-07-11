describe('Blog App', function () {
  beforeEach(async function () {
    const defaultUsers = [{
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    },
    {
      username: 'test',
      name: 'Supertest',
      password: 'testing'
    }]

    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    for (const user of defaultUsers) {
      cy.request('POST', 'http://localhost:3003/api/users', user)
    }

    cy.visit('http://localhost:3000')

    await new Promise(r => setTimeout(r, 1000))
  })

  it('Login form is shown', function () {
    cy.contains('Log into App')
    cy.get('form button').contains('Login')
  })

  describe('Login test', function () {
    it('Successful login', function () {
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('salainen')
      cy.get('#loginButton').click()

      cy.get('div.success').then(() => cy.contains('Successfully'))
    })

    it('Unsuccessful login', function () {
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('error')
      cy.get('#loginButton').click()

      cy.get('div.error').then(() => cy.contains('invalid'))
      cy.get('div.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      const defaultBlogs = [{
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/'
      },
      {
        title: 'Another Test',
        author: 'MM Chan',
        url: 'https://reactpatterns.com/',
        likes: 5
      },
      {
        title: 'E2E Testing for noobs',
        author: 'MeMeMe',
        url: 'https://reactpatterns.com/',
        likes: 2
      }]

      cy.login({ username: 'root', password: 'salainen' })
      cy.createMultipleBlogs(defaultBlogs)
    })

    it('Can create a blog', function () {
      const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
      }

      cy.get('div button').contains('new blog').click()
      cy.get('form input[name=title]').type(newBlog.title)
      cy.get('form input[name=author]').type(newBlog.author)
      cy.get('form input[name=url]').type(newBlog.url)

      cy.get('form button[type=submit]').click()

      cy.get('div.success').then(() => cy.contains('Successfully created'))
      cy.get('h2').contains('Blog list')
      cy.get('div em').contains(newBlog.title)
    })

    it('Can like a blog', function () {
      cy.get('div em + button').contains('show').click()
      cy.get('div.switchable-content').as('theContent')
      cy.get('@theContent').contains('like').click()
      cy.get('@theContent').find('.like-counter').should('contain', '1')
    })

    it('The owner can delete his blog', function () {
      cy.get('div em + button').contains('show').click()
      cy.get('div.switchable-content').should('contain', 'root')
      cy.get('div.switchable-content:first button:last').should('contain', 'remove').click()
      cy.get('div.success').then(() => cy.contains('Successfully'))
    })

    it('Only the owner can see the remove button', function () {
      cy.get('div em + button').contains('show').click()
      cy.get('div.switchable-content button:last').should('contain', 'remove')
      cy.get('button').contains('logout').click()

      cy.login({ username: 'test', password: 'testing' })

      cy.get('div em + button').contains('show').click()
      cy.get('div.switchable-content button:last').should('contain', 'like')
    })

    it.only('Blogs are ordered by likes', function () {
      cy.get('div em').eq(0).should('contain', 'Another Test')
      cy.get('div em').eq(1).should('contain', 'E2E Testing for noobs')

      cy.get('#root > div:nth-child(8)').contains('show').click()
      cy.get('#root > div:nth-child(8) div.switchable-content button').contains('like').as('like')

      cy.get('@like').click()
      .then(() => cy.get('@like').click())
      .then(() => cy.get('@like').click())

      cy.get('div em').eq(1).should('contain', 'React patterns')
    })
  })
})