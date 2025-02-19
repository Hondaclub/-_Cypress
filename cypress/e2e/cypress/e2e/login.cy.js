import * as data from "../../../helpers/default_data.json"
describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
          });

    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
           });


    it('1.Верный логин, верный пароль', function () {
         cy.get('#mail').type(data.login);
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();
         cy.get('#messageHeader').should('be.visible');
         cy.get('#messageHeader').contains('Авторизация прошла успешно');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible')
         
     })

     it('2.Восстановление пароля', function () {
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type(data.login)
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')  
     })

     it('3.Правильный логин, неправильный пароль ', function () {
        cy.get('#mail').type(data.login);
        cy.get('#pass').type('Loveqastudio2i');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')
     })

     it('4.Неправильный логин, правильный пароль ', function () {
        cy.get('#mail').type('erman@dolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')
     })

     it('5.Логин без @, правильный пароль ', function () {
        cy.get('#mail').type('germandolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')
     })

     it('6.Логин GerMan@Dolnikov.ru, правильный пароль ', function () {
        cy.get('#mail').type('GerMan@Dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')
     })



     


 }) 