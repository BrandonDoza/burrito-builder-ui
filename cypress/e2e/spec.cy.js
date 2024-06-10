describe("burrito builder", () => {
  beforeEach(() => {
cy.intercept('GET',  'http://localhost:3001/api/v1/orders' , {
  statusCode: 200, 
  fixture: 'mockOrders.json'  
})
cy.intercept('POST',  'http://localhost:3001/api/v1/orders' , {
  statusCode: 200, 
  body: {
    name: "Bob",
    ingredients: [ "steak", "hot sauce" ]
  }
})
cy.visit('http://localhost:3000/')
  })
  it('Shold see details about the page', () => {
    cy.get('h1').contains('Burrito Builder')
  })
  it('Should see a list of current orders', ()=> {
    cy.get('.order').should('have.length', 3)
    cy.get('.order').first().contains('Pat')
    cy.get('.order').last().contains('Alex')
  })
  it('Should be able to add an order', () => {
    cy.get('input').type('Bob')
    cy.get('[name="steak"]').click()
    cy.get('[name="hot sauce').click()
    cy.get('[name="cilantro').click()
    cy.get('.order-button').click()
    cy.get('.order').should('have.length', 4)
    cy.get('.order').first().contains('Pat')
    cy.get('.order').last().contains('Bob')
  })
  it('Should not allow an order to be placed without a name', () => {
    cy.get('[name="steak"]').click()
    cy.get('[name="hot sauce').click()
    cy.get('.order-button').click()
    cy.get('#error-element').contains('You must add your name')
  })
  it('Should not allow an order to be submitted without at least one ingredient', () => {
    cy.get('input').type('Guy')
    cy.get('.order-button').click()
    cy.get('#error-element').contains('You must choose at least one ingredient')
  })
});
