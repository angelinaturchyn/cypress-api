describe('Api calls', function () {
    beforeEach('login to the app',()=>{
        cy.intercept({method:'Get', path:'tags'}, {fixture:'tags.json'})
        cy.loginTo()
    })

    it('Deletion of article in global feed',()=>{

        const userData = {
            "user": {
                "email": "angelinaturchyn@gmail.com",
                "password": "307903aaa"
            }
        }

        const bodyRequest = {
            "article": {
                "title": "Cypressss3 Unique APIs",
                "slug": "API-20202",
                "body": "API request",
                "description": "Cypress",
                "tagList": []
            }
        }

        cy.request('POST','https://api.realworld.io/api/users/login', userData)
            .its('body').then(body=>{
                const token = body.user.token

            cy.request({
                url: "https://api.realworld.io/api/articles",
                headers: {'Authorization': 'Token '+token},
                method: 'POST',
                body: bodyRequest
            }).then(response =>{
                expect(response.status).to.equal(200)
            })

            cy.contains('Global Feed').click()
            cy.get('[class="article-preview"]').eq(0).click()
            cy.get('.article-actions').contains('Delete Article').click()

        })
    })
});

