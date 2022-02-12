describe('Test with backend', () => {

    beforeEach('login to the app',()=>{
        cy.server()
        cy.route('GET', '**/tags', 'fixture:tags.json')
        cy.loginTo()

    })

    it('Verify correct request and response', () => {

        cy.server()
        cy.route('POST', '**/articles').as('postArticles')

        cy.contains(' New Article ').click()
        cy.get('[placeholder="Article Title"]').type('COOL KAts')
        cy.get('[placeholder="What\'s this article about?"]').type('NOTHIIIIIINGGGGGGSS')
        cy.get('[placeholder="Write your article (in markdown)"]').type('wowowowwww!!!!!!!!!!!!!!!!!!')
        cy.contains(' Publish Article ').click()

        cy.wait('@postArticles')
        cy.get('@postArticles').then(xhr => {
            console.log(xhr)
            expect(xhr.status).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('wowowowwww!!!!!!!!!!!!!!!!!!')
            expect(xhr.response.body.article.description).to.eq('NOTHIIIIIINGGGGGGSS')
        })
    })

    it.only('Should show new tags',() =>{
        cy.get('[class="sidebar"]')
            .should('contain','Code')
            .and('contain','Like')
            .and('contain','SpeedyGonzales')
    })
})
