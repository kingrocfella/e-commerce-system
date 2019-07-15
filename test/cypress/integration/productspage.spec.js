describe("Local storage", () => {
  beforeEach(() => {
    cy.visit('/products'); 
  });

  it("Enters a search term that does not exist", () => {
    const search = "Hoooo";
    cy.get("#searchBox").type(search).type("{enter}").get(".spacedRow").should("not.exist");
  });

  it("Enter a search term that does exist", () => {
    const search = "coat";
    cy.get("#searchBox").type(search).type("{enter}").get(".spacedRow").should("have.length",2);
  });

  it("Filters products by Department", () => {
    cy.get(".collection-item").first().click().get(".paginationBtn").should("have.length",2);
  });

  it("Filters products by Category", () => {
    cy.get(".collection-item").first().click().get(".catgry").first().click().get(".paginationBtn").should("have.length",1);
  });

  it("Class add-overlay is added to an hovered product", () => {
    cy.get(".spacedRow").first().trigger('mouseover').get(".add-overlay").should("have.length",1);
  });
  
});