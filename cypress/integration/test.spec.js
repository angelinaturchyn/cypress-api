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
        cy.get('[placeholder="Article Title"]').type('your KAtsss')
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

    it('Should show new tags',() =>{
        cy.get('[class="sidebar"]')
            .should('contain','Code')
            .and('contain','Like')
            .and('contain','SpeedyGonzales')
    })

    it.only('verify global feed likes count', () => {

        cy.route('GET', '**/articles/feed', '{"articles":[],"articlesCount":0}')
        cy.route('GET', '**/articles', 'fixtures:articles.json')

        cy.contains('Global Feed').click()
        cy.get('app-article-list button').then( listOfButtons => {
            expect(listOfButtons[0]).to.contain('0')
            expect(listOfButtons[1]).to.contain('0')
        })

        cy.fixture('articles').then(file => {
         const articleLink = file.articles[0].slug
            cy.route('POST', '**/articles/'+articleLink+'/favorite', file)
        })

        cy.get('app-article-list button').eq(0).click().should('contain', 1)

    })


})
