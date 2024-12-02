import selectors from '../e2e/Selectores/selectors'; //Importar los selectores

// Ingresar texto
Cypress.Commands.add('typeText',(selector,dato) => {
    cy.get(selector).type(dato);
});

// Realizar clic en un elemento
Cypress.Commands.add('clickElement', (selector) => {
    cy.get(selector).click();  
  });

// Verifica que el elemento esté visible
  Cypress.Commands.add('checkVisible', (selector) => {
    cy.get(selector).should('be.visible');  
  });

  // Seleccionar elemento en dropdown
  Cypress.Commands.add('selectDropdown', (dropDownSelector, optionSelector, optionText) => { 
   cy.get(dropDownSelector).type(optionText); //Escribir texto en el dropdown
  cy.get(optionSelector).click();
  });


