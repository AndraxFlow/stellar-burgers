Cypress.Commands.add('clickIngredientInIndexedContainer', (index: number) => { 
    cy.get("[data-cy='ingredients-items']").eq(index)
    .find("[data-cy='ingredient-container']").first()
    .find("button").click();
});

Cypress.Commands.add('checkModalViibility', (isModalVisible: boolean) => { 
    cy.get("[data-cy='modal']").should(`${!isModalVisible ? "not." : ""}exist`);
});

declare namespace Cypress {
    interface Chainable {
      clickIngredientInIndexedContainer(index: number): Chainable<void>;
      checkModalViibility(isModalVisible: boolean): Chainable<void>;
    }
}