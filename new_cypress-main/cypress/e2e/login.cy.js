

import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');  // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восст. пароль
          });

    afterEach('Конец теста', function () {
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя
          });

    it('Верный пароль и верный логин', function () {

         cy.get(main_page.email).type(data.login); // Ввели верный логин
         cy.get(main_page.password).type(data.password); // Ввели верный пароль
         cy.get(main_page.login_button).click(); // Нажали на кнопку Войти

         cy.wait(500)

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю что после ато.вижу текст
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
         cy.get('.link').should('be.visible');
     })


     it(' Проверка восстановления пароля ', function () {

        cy.get(main_page.fogot_pass_btn).click(); // Нажимаю восстановить пароль

        cy.get(recovery_password_page.email).type(data.login); // Ввел почту для восстановления
        cy.get(recovery_password_page.send_button).click(); // Нажал отправить код

        cy.wait(500)

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю  на соапод. текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        cy.get('.link').should('be.visible');
    })


     it('Неверный  пароль и верный логин', function () {

        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio9'); // Ввели неверный пароль
        cy.get(main_page.login_button).click(); // Нажали на кнопку Войти

        cy.wait(500)

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю на совп. текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        cy.get('.link').should('be.visible');
    })


    it('Верный  пароль и неверный логин', function () {

        cy.get(main_page.email).type('german@dolnikov.rusdf'); // Ввели неверный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажали на кнопку Войти

        cy.wait(500)

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю совп. текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        cy.get('.link').should('be.visible');
    })


    it('Верный  пароль и неверный логин  (проверка что в логине есть @) ', function () {

        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели неверный логин, без @
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажали на кнопку Войти

        cy.wait(500)

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю совп. текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        cy.get('.link').should('be.visible');
    })


    it('Проверка на приведение к строчным буквам', function () {

        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели неверный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажали на кнопку Войти

        cy.wait(500)

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю совп. текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        cy.get('.link').should('be.visible');
    })
 })