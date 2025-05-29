describe('Создание заказа', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', { fixture: 'token.json'}).as('token');
        cy.intercept('POST', 'api/orders', { fixture: 'orders.json'}).as('orders');

        cy.visit('/');
        cy.wait('@getIngredients');
    });

    it('Добавление ингредиентов', () => {
        cy.get("[data-cy='noBuns']").should("have.length", 3);

        cy.clickIngredientInIndexedContainer(0);

        cy.clickIngredientInIndexedContainer(1);

        cy.get("[data-cy='burger-constructor-element']").should("be.visible");
        cy.get("[data-cy='burger-constructor-element-fullwidth']").should("be.visible");

        cy.get("[data-cy='place-order']").click();

        cy.checkModalViibility(true);
        cy.get("[data-cy='order-details-title']").first()
            .should('have.text', '71808');

        cy.get("[data-cy='modal']")
            .find("button")
            .click();
      
        cy.checkModalViibility(false);
    });
});