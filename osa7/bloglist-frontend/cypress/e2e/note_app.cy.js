describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "Matti Mattinen",
      username: "mmattinen",
      password: "salainen",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function () {
    cy.contains("login");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mmattinen");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Matti Mattinen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("mmattinen");
      cy.get("#password").type("alainen");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("mmattinen");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Matti Mattinen logged in");
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title-form").type("A blog for testing");
      cy.get("#author-form").type("Cypress");
      cy.get("#url-form").type("testing url");
      cy.contains("create").click();
      cy.contains("A blog for testing");
    });
  });

  describe("When blog created", function () {
    beforeEach(function () {
      cy.get("#username").type("mmattinen");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("Matti Mattinen logged in");

      cy.contains("new blog").click();
      cy.get("#title-form").type("A blog for testing");
      cy.get("#author-form").type("Cypress");
      cy.get("#url-form").type("testing url");
      cy.contains("create").click();
      cy.contains("A blog for testing");
    });

    it("A blog can be liked", function () {
      cy.contains("view").click();
      cy.contains("like").click();
    });

    it("A blog can be removed by user that added it", function () {
      cy.contains("view").click();
      cy.contains("delete").click();
      cy.contains("blog successfully removed from database");
    });
  });
});
