/// <reference types="cypress" /> 
import selectors from './Selectores/selectors'


describe('E2E - Gestión de usuarios en OrangeHRM', () => {
  let miUserData;
  let loginData;
  
//Antes de cada prueba
  beforeEach(() => {
    cy.visit('/'); //Acceder a la página de inicio
  
    cy.fixture('./loginData')
    .then((dataLogin) => { // Llegan los datos de loginData
    loginData = dataLogin; // Se almacenan en la variable loginData

    // Realizar el login con los datos almacenados previamente
    cy.typeText(selectors.login.username, loginData.username)
    cy.typeText(selectors.login.password, loginData.password)
    cy.clickElement(selectors.login.btn_login)
    cy.checkVisible(selectors.login.header_login) // Checkear que la cabecera de login es visible después de loguearse

    });
  });
  
   it('Debería crear un usuario dinámicamente', () => {
   
// Navegar a la sección Admin y agregar un usuario
  cy.clickElement(selectors.userManagement.btn_adminMenu);
  cy.clickElement(selectors.userManagement.btn_addUser);

// Ingresar un Username dinámico
  cy.fixture('user_data').then((UserData) => {
  const randomUsername = Cypress._.sample(UserData.usernames); 
  cy.typeText(selectors.userManagement.add_username,randomUsername)
});

  // Seleccionar User Role
cy.selectDropdown(
  selectors.userManagement.dropdownRoleUser,
  selectors.userManagement.dropdownOptions,
  'Admin'
);

// Ingresar Employee Name
cy.typeText(selectors.userManagement.add_employee_name, 'James  Butler') //Este dato debe estar al menos 1 vez en el listado.
cy.clickElement(selectors.userManagement.dropdownEmployeeName)

  // Seleccionar Status
  cy.selectDropdown(
    selectors.userManagement.dropdownStatus,
    selectors.userManagement.dropdownOptions,
    'Enabled'
  );

  //Ingreso clave por primera vez
  cy.typeText(
    selectors.userManagement.add_password, loginData.password
  )
  //Ingreso clave para confirmar
  cy.typeText(
    selectors.userManagement.add_confirm_password, loginData.password
  )

  //Click en el botón para guardar usuario
  cy.clickElement(selectors.userManagement.add_save_btn)
});
});
