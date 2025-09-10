/// <reference types="cypress" />

// Ингредиенты: загрузка и добавление в конструктор. Модальные окна ингредиента.
import { selectors } from '../support/selectors';

describe('Constructor Burger', () => {
  let ingredientsData: any;

  beforeEach(() => {
    cy.intercept('GET', '**/auth/user', { fixture: 'login.json' }).as(
      'getUser'
    );
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    window.localStorage.setItem('refreshToken', 'refreshTokenMock');
    cy.setCookie('accessToken', 'Bearer accessTokenMock');

    cy.visit('/');

    cy.wait(['@getUser', '@getIngredients']);
    cy.get('@getUser').its('response.statusCode').should('eq', 200);
    cy.get('@getIngredients').its('response.statusCode').should('eq', 200);

    cy.fixture('ingredients.json').then((data) => {
      ingredientsData = data.data;

      const bun = ingredientsData.find((i: any) => i.type === 'bun');
      cy.contains(bun.name).parents(selectors.ingredient).as('bunItem');
      cy.get('@bunItem')
        .find('button', { timeout: 10000 })
        .scrollIntoView()
        .should('exist')
        .and('not.be.disabled')
        .as('addBun');

      const filling = ingredientsData.find((i: any) => i.type === 'main');
      cy.contains(filling.name).parents(selectors.ingredient).as('mainItem');
      cy.get('@mainItem')
        .find('button', { timeout: 10000 })
        .scrollIntoView()
        .should('exist')
        .and('not.be.disabled')
        .as('addMain');

      const sauce = ingredientsData.find((i: any) => i.type === 'sauce');
      cy.contains(sauce.name).parents(selectors.ingredient).as('sauceItem');
      cy.get('@sauceItem')
        .find('button', { timeout: 10000 })
        .scrollIntoView()
        .should('exist')
        .and('not.be.disabled')
        .as('addSauce');
    });
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('adds ingredients', () => {
    cy.get('@addBun')
      .scrollIntoView()
      .and('not.be.disabled')
      .click({ force: true });
    cy.get('@addMain')
      .scrollIntoView()
      .and('not.be.disabled')
      .click({ force: true });
    cy.get('@addSauce')
      .scrollIntoView()
      .and('not.be.disabled')
      .click({ force: true });

    cy.fixture('ingredients.json').then((data) => {
      const bun = data.data.find((i: any) => i.type === 'bun');
      const filling = data.data.find((i: any) => i.type === 'main');
      const sauce = data.data.find((i: any) => i.type === 'sauce');

      cy.get(selectors.constructorElement)
        .should('contain.text', bun.name)
        .and('contain.text', filling.name)
        .and('contain.text', sauce.name);
    });
  });

  it('closes modal by close button', () => {
    cy.get('@bunItem').find('a').scrollIntoView().click({ force: true });
    cy.get(selectors.modal, { timeout: 10000 })
      .should('exist')
      .and('be.visible');
    cy.location('pathname').should('include', '/ingredients/');

    cy.fixture('ingredients.json').then((data) => {
      const bun = data.data.find((i: any) => i.type === 'bun');

      cy.get(selectors.modal)
        .find(selectors.ingredientName)
        .should('have.text', bun.name);

      cy.get(selectors.modal)
        .contains('Белки')
        .next()
        .should('have.text', bun.proteins.toString());
      cy.get(selectors.modal)
        .contains('Жиры')
        .next()
        .should('have.text', bun.fat.toString());
      cy.get(selectors.modal)
        .contains('Углеводы')
        .next()
        .should('have.text', bun.carbohydrates.toString());
    });

    cy.get(selectors.modalClose).click({ force: true });
    cy.location('pathname', { timeout: 15000 }).should(
      'include',
      '/ingredients/'
    );
  });

  it('closes modal by overlay', () => {
    cy.get('@mainItem').find('a').scrollIntoView().click({ force: true });
    cy.get(selectors.modalOverlay).should('exist');
    cy.location('pathname').should('include', '/ingredients/');

    cy.fixture('ingredients.json').then((data) => {
      const filling = data.data.find((i: any) => i.type === 'main');

      cy.get(selectors.modal)
        .find(selectors.ingredientName)
        .should('have.text', filling.name);

      cy.get(selectors.modal)
        .contains('Белки')
        .next()
        .should('have.text', filling.proteins.toString());
      cy.get(selectors.modal)
        .contains('Жиры')
        .next()
        .should('have.text', filling.fat.toString());
      cy.get(selectors.modal)
        .contains('Углеводы')
        .next()
        .should('have.text', filling.carbohydrates.toString());
    });

    cy.get(selectors.modalOverlay).click({ force: true });
    cy.location('pathname', { timeout: 15000 }).should(
      'include',
      '/ingredients/'
    );
  });

  it('creates order', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.get('@addBun').click({ force: true });
    cy.get('@addMain').click({ force: true });
    cy.get('@addSauce').click({ force: true });

    cy.fixture('ingredients.json').then((data) => {
      const bun = data.data.find((i: any) => i.type === 'bun');
      const filling = data.data.find((i: any) => i.type === 'main');
      const sauce = data.data.find((i: any) => i.type === 'sauce');

      cy.get(selectors.constructorElement)
        .should('contain.text', bun.name)
        .and('contain.text', filling.name)
        .and('contain.text', sauce.name);
    });

    cy.contains('Оформить заказ')
      .scrollIntoView()
      .and('not.be.disabled')
      .click({ force: true });
    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

    cy.get(selectors.modal, { timeout: 10000 })
      .should('exist')
      .and('be.visible');
    cy.fixture('order.json').then((json) => {
      cy.get(selectors.orderNumber)
        .should('exist')
        .and('have.text', json.order.number.toString());
    });

    cy.get(selectors.modalClose).click({ force: true });
    cy.get(selectors.modal, { timeout: 10000 }).should('not.exist');
  });
});
