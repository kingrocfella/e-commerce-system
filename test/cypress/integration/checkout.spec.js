import LoginDetails from './logindetails';

describe("Handles product checkout", () => {
  beforeEach(() => {
    LoginDetails();
    cy.get(".spacedRow").first().trigger('mouseover').get(".color").first().click().contains('Yellow').click({force:true}).get(".size").first().click().contains('XL').click({force:true}).get(".styledButton").click();
    cy.get(".badgeNum").click();
  });


  it("Can increase and decrease product quantity", () => {
    cy.get(".addQuantity").click().get(".productQuantity").contains(2);
    cy.get(".reduceQuantity").click().get(".productQuantity").contains(1);
  });

  it("Redirect to products if continue shopping is clicked", () => {
    cy.get("#continueShopping").click();
    cy.location('pathname').should('eq', '/shopmate/products');
  });

  it("Go to Orders page when Proceed is clicked", () => {
    cy.get(".proceedToOrders").click();
    cy.location('pathname').should('eq', '/shopmate/products/orders');
  });
});