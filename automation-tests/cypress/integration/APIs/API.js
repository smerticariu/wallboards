/// <reference types="cypress" />

let id = [''];
context('API Testing', () => {
    //Execute before each test to extract the auth token
    beforeEach(() => {
        cy.getToken()

    })

    //
    describe('Connector', () => {

        it('Connector - GET', () => {
            let privateToken = "Bearer " + localStorage.getItem('auth')
            cy.request({
                method: 'GET',
                url: 'https://smartevc-web-chargingstationapi.azurewebsites.net/api/v1/connectors/cost-max-and-power-intervals',
                headers: {
                    'Authorization': privateToken
                }

            })
                .then((response) => {

                    expect(response).to.have.property('status', 201)
                    expect(response.body).to.not.be.null
                    expect(response.body).to.have.property('costMax', 35)
                })

        })

    })
    describe('ChargingStation', () => {

        it('ChargingStation - GET', () => {
            let privateToken = "Bearer " + localStorage.getItem('auth')
            cy.request({
                method: 'GET',
                url: 'https://smartevc-web-chargingstationapi.azurewebsites.net/api/v1/connectors/cost-max-and-power-intervals',
                headers: {
                    'Authorization': privateToken
                }

            })
                .then((response) => {
                    expect(response).to.have.property('status', 200)
                    expect(response.body).to.not.be.null

                })

        })
    })

    describe('ConnectorType', () => {

        it('ConnectorType - POST', () => {
            let privateToken = "Bearer " + localStorage.getItem('auth')
            cy.request({
                method: 'POST',
                url: 'https://smartevc-web-connectortypeapi.azurewebsites.net/api/v1/connector-types',
                headers: {
                    'Authorization': privateToken

                },
                body: {
                    "name": "Type EmyTest",
                    "logo": null

                }

            })
                .then((response) => {
                    expect(response).to.have.property('status', 201)
                    expect(response.body).to.not.be.null

                })

        })

        it.only('ConnectorType - GET', () => {
            let privateToken = "Bearer " + localStorage.getItem('auth')
            cy.request({
                method: 'GET',
                url: 'https://smartevc-web-connectortypeapi.azurewebsites.net/api/v1/connector-types',

                headers: {
                    'Authorization': privateToken
                }

            })
                .then((response) => {

                    let body = JSON.parse(JSON.stringify(response.body))
                    expect(response).to.have.property('status', 200)
                    expect(response.body).to.not.be.null
                    body.forEach(function (item) {
                        expect(item).to.have.all.keys("id", "name", "logoUrl")
                        if (item["name"] = "Type EmyTest") {
                            id = item["id"]
                        }
                    })
                    cy.log(id)
                })

        })

        it('ConnectorType - POST', () => {
            let privateToken = "Bearer " + localStorage.getItem('auth')
            cy.request({
                method: 'POST',
                url: 'https://smartevc-web-connectortypeapi.azurewebsites.net/api/v1/connector-types',
                failOnStatusCode: false,
                headers: {
                    'Authorization': privateToken

                },
                body: {
                    "name": "Type EmyTest",
                    "logo": null

                }

            })
                .then((response) => {
                    expect(response).to.have.property('status', 409)
                    expect(response.body).to.not.be.null

                    cy.log(id)
                })

        })

        it('ConnectorType - DELETE', () => {
            let connectorId = [];
            connectorId.push[id]
            let privateToken = "Bearer " + localStorage.getItem('auth')
            cy.request({
                method: 'DELETE',
                url: 'https://smartevc-web-connectortypeapi.azurewebsites.net/api/v1/connector-types',
                headers: {
                    'Authorization': privateToken

                },
                body: connectorId


            })
                .then((response) => {
                    expect(response).to.have.property('status', 204)
                    expect(response.body).to.not.be.null


                })

        })
    })
})