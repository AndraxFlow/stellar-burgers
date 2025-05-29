describe('Функциональность конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' })
      .as('loadIngredients');
    
    cy.visit('/');
    
    cy.wait('@loadIngredients');
  });

  const openIngredientModal = () => {
    cy.get("[data-cy='ingredients-items']")
      .first()
      .find("[data-cy='ingredient-container']")
      .first()
      .click();
  };

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен корректно добавлять ингредиенты в конструктор', () => {
      cy.get("[data-cy='noBuns']")
        .should("have.length", 3);
      
      cy.clickIngredientInIndexedContainer(0);
      
      cy.clickIngredientInIndexedContainer(1);
      
      cy.get("[data-cy='burger-constructor-element']")
        .should("be.visible");
      cy.get("[data-cy='burger-constructor-element-fullwidth']")
        .should("be.visible");
    });
  });

  describe('Работа с модальными окнами', () => {
    beforeEach(() => {
      openIngredientModal();
      cy.checkModalViibility(true);
    });

    it('должен закрывать модальное окно по клику на кнопку', () => {
      cy.get("[data-cy='modal']")
        .find("button")
        .click();
      
      cy.checkModalViibility(false);
    });

    it('должен закрывать модальное окно по клику на оверлей', () => {
      cy.get("[data-cy='modal-overlay']")
        .click({ force: true });
      
      cy.checkModalViibility(false);
    });
  });
});