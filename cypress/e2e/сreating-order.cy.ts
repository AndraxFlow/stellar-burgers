describe('Создание заказа', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', { fixture: 'token.json'}).as('token');
        cy.intercept('POST', 'api/orders', { fixture: 'orders.json'}).as('createOrder');

        // Устанавливаем токены
        cy.window().then((win) => {
            win.localStorage.setItem('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGFmZWJjNmZjZTdkMDAxZGI1YjIzZCIsImlhdCI6MTc0MjQwNTMwOCwiZXhwIjoxNzQyNDA2NTA4fQ.ZhfD0nRpRkWMfRwSIw-b-CUN8FsrqBPYMtU_q7POYHI');
            win.localStorage.setItem('refreshToken', 'd1c1edc926e7dfd13f0a5e77e0531d927ab6f29105cb28243301e3e48d20d4ac857da810446d7393');
        });
        cy.setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGFmZWJjNmZjZTdkMDAxZGI1YjIzZCIsImlhdCI6MTc0MjQwNTMwOCwiZXhwIjoxNzQyNDA2NTA4fQ.ZhfD0nRpRkWMfRwSIw-b-CUN8FsrqBPYMtU_q7POYHI');

        cy.visit('/');
        cy.wait('@getIngredients');
    });

    afterEach(() => {
        // Удаляем токены после каждого теста
        cy.window().then((win) => {
            win.localStorage.removeItem('accessToken');
            win.localStorage.removeItem('refreshToken');
        });
        cy.clearCookie('accessToken');
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

        // Проверка  что весь конструктор очищен
        cy.get("[data-cy='burger-constructor-element']").should("not.exist");
        cy.get("[data-cy='burger-constructor-element-fullwidth']").should("not.exist");
        cy.get("[data-cy='noBuns']").should("have.length", 3);
    });
});