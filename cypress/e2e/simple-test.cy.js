/// <reference types="cypress" />
import badConnection from '../../fixtures/bad-connection.json'
describe("Premier Exo", () => {
  it("Connexion", () => {
    cy.visit("https://practice.automationtesteracademy.com/");
    cy.get('[data-testid="logo-img-login"]').should("be.visible");
    cy.get('[data-test="username-login"]')
      .type("login_user")
      .should("have.value", "login_user");
    cy.get('[data-test="password-login"]')
      .type("cypress-geek")
      .should("have.value", "cypress-geek");
    cy.get('[data-test="remember-login"]').check();
    cy.get('[data-test="submit-login"]')
      .should("have.text", "Se Connecter")
      .click();
    cy.url().should("eq", "https://practice.automationtesteracademy.com/home");
    cy.url().should("include", "/home");
  });

  it("Connexion failed - bad password", async () => {
    const login = "login_user";
    const password = "bad-password";

    cy.visit("https://practice.automationtesteracademy.com/");
    cy.get('[data-testid="logo-img-login"]').should("be.visible");
    cy.get('[data-test="username-login"]')
      .type(login)
      .should("have.value", login);
    cy.get('[data-test="password-login"]')
      .type(password)
      .should("have.value", password);
    const loginElement = cy.get('[data-test="submit-login"]');

    loginElement.should("have.text", "Se Connecter")
      .click();

    cy.url().should("not.eq", "https://practice.automationtesteracademy.com/home");

    cy.get("[data-test='password-login']").get(".error-message").contains(
      "Veuillez vérifier votre nom d'utilisateur ou mot de passe"
    );
  });

  it("Connexion failed - empty password", async () => {
    const login = "login_user";

    cy.visit("https://practice.automationtesteracademy.com/");
    cy.get('[data-testid="logo-img-login"]').should("be.visible");
    cy.get('[data-test="username-login"]')
      .type(login)
      .should("have.value", login);

    cy.get('[data-test="submit-login"]').should("have.text", "Se Connecter")
      .click();

    cy.url().should("not.eq", "https://practice.automationtesteracademy.com/home");


    cy.get("[data-test='password-login']").get(".error-message").contains(
      "Veuillez vérifier votre nom d'utilisateur ou mot de passe"
    );
  });

  it("Connexion failed - empty login", async () => {
    const password = "cypress-geek";

    cy.visit("https://practice.automationtesteracademy.com/");
    cy.get('[data-testid="logo-img-login"]').should("be.visible");
    cy.get('[data-test="password-login"]')
      .type(password)
      .should("have.value", password);
    const loginElement = cy.get('[data-test="submit-login"]');

    loginElement.should("have.text", "Se Connecter")
      .click();

    cy.url().should("not.eq", "https://practice.automationtesteracademy.com/home");

    cy.get("[data-test='user-login']").get(".error-message").contains(
        "Veuillez renseigner votre nom d'utilisateur"
    );
  });
});

// oubli du mot de passe
// mot de passe
// redirection vers l'inscription