const login = () => {
  cy.visit("/login");
  const email = "tunde.bakare@gmail.com";
  const password = "12345";
  cy.get("#email").type(email);
  cy.get("#password").type(password).type("{enter}");
}

export default login;