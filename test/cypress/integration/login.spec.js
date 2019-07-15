describe("Login Test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Ensures sign-in button is disabled while the email and password fields are empty", () => {
    cy.get(".btn").should('be.disabled');
  });

  it("Displays an error message for invalid login details", () => {
    const email = "Test@gmail.com";
    const password = "password";
    cy.get("#email").type(email);
    cy.get("#password").type(password).type("{enter}");
    cy.get(".red-text").contains('Email or Password is invalid');
  });

  it("Redirects user to products page if login successful", () => {
    const email = "tunde.bakare@gmail.com";
    const password = "12345";
    cy.get("#email").type(email);
    cy.get("#password").type(password).type("{enter}");
    cy.location('pathname').should('eq', '/shopmate/products');
  });
  
});