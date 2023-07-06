describe('Blog App', function () {
  beforeEach(async function () {
    const defaultUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', defaultUser)
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
      const defaultBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/'
      }
      cy.login({ username: 'root', password: 'salainen' })
      cy.createBlog(defaultBlog)
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

    /*it.only('Can like a blog', function () {
      cy.get('div em > button').contains('show')
    })*/
  })
})