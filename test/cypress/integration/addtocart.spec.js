import LoginDetails from './logindetails';

describe("Handles adding products to cart", () => {
  beforeEach(() => {
    LoginDetails();
  });

  it("Can select both color and size for products", () => {
    cy.get(".spacedRow").first().trigger('mouseover').get(".color").first().click().contains('Yellow').click({force:true}).get(".size").first().click().contains('XL').click({force:true});
  });

  it("It can select attributes and add to cart", () => {
    cy.get(".spacedRow").first().trigger('mouseover').get(".color").first().click().contains('Yellow').click({force:true}).get(".size").first().click().contains('XL').click({force:true}).get(".styledButton").click().get(".badgeNum").contains(1);
  });

  it("An Error modal pops up if no attribute is selected and users wants to add to cart", () => {
    cy.get(".spacedRow").first().trigger('mouseover').get(".styledButton").click().get(".red-text").contains("Please select both attribute color and size!");
  });

  it("Product checkout page loads on click of cart logo", () => {
    cy.get(".badgeNum").click();
    cy.location('pathname').should('eq', '/shopmate/products/checkout');
  });

  it("Successfully checks out products in cart", () => {
    cy.get(".spacedRow").first().trigger('mouseover').get(".color").first().click().contains('Yellow').click({force:true}).get(".size").first().click().contains('XL').click({force:true}).get(".styledButton").click();
    cy.get(".badgeNum").click();
    cy.get(".checkoutRows").should("have.length",1);
  });
});