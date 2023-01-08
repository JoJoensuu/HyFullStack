describe('Blog app', function() {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Matti Mattinen',
            username: 'mmattinen',
            password: 'salainen'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function() {
        cy.contains('login')
        cy.contains('username')
        cy.contains('password')
    })
})