import App from "../App"
import React from "react"
import renderWithRouter from "./helpers/renderWithRouter"
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import recipes from './helpers/recipesMock';
import tamiya from './helpers/mockTamiya';
import abcRecipe from './helpers/mockAbc';

jest.spyOn(global, 'alert');
global.alert.mockImplementation(() => {});

  afterEach(() => jest.clearAllMocks())

describe('Testes do Header', () => {
  it('Verifica se Header renderiza na tela', () => {
    const { history } =  renderWithRouter(<App />)
    
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const btnSubmit = screen.getByTestId('login-submit-btn')
    
    userEvent.type(email, 'test@test.com')
    userEvent.type(password, '1234567')
    userEvent.click(btnSubmit)
    
    const btnProfile = screen.getByRole('button', {
      name: /imagem perfil/i
    })

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    
    userEvent.click(btnSearch)

    const inputSearch = screen.getByTestId('search-input')
    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    const radioName = screen.getByRole('radio', {
      name: /name/i
    })
    const radioIngredient = screen.getByRole('radio', {
      name: /ingredient/i
    })
    const radioFirstLetter = screen.getByRole('radio', {
      name: /first letter/i
    })
    
    userEvent.type(inputSearch, 'Arrabiata')
    userEvent.click(radioName)
    userEvent.click(btnSearchRecipe)

    userEvent.type(inputSearch, 'garlic')
    userEvent.click(radioIngredient)
    userEvent.click(btnSearchRecipe)

    userEvent.type(inputSearch, 'A')
    userEvent.click(radioFirstLetter)
    userEvent.click(btnSearchRecipe)
    
    userEvent.click(btnProfile)

  })

  it('Tela drinks', () => {
    const { history } =  renderWithRouter(<App />)

    history.push('/drinks')

    expect(history.location.pathname).toBe('/drinks')

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    userEvent.click(btnSearch)

    const inputSearch = screen.getByTestId('search-input')
    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    const radioName = screen.getByRole('radio', {
      name: /name/i
    })
    const radioIngredient = screen.getByRole('radio', {
      name: /ingredient/i
    })
    const radioFirstLetter = screen.getByRole('radio', {
      name: /first letter/i
    })

    userEvent.type(inputSearch, 'Margarita')
    userEvent.click(radioName)
    userEvent.click(btnSearchRecipe)

    userEvent.type(inputSearch, 'Tequila')
    userEvent.click(radioIngredient)
    userEvent.click(btnSearchRecipe)

    userEvent.type(inputSearch, 'M')
    userEvent.click(radioFirstLetter)
    userEvent.click(btnSearchRecipe)

    userEvent.click(btnSearchRecipe);
  } )
  it('Rotas foods', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => recipes
    }));

    const { history } =  renderWithRouter(<App />)

    history.push('/foods')

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    userEvent.click(btnSearch)
    
    const inputSearch = screen.getByTestId('search-input')
    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    const radioName = screen.getByRole('radio', {
      name: /name/i
    })

  
    global.fetch = jest.fn(async () => ({
      json: async () => tamiya
    }));
    
    userEvent.type(inputSearch, 'Tamiya')
    userEvent.click(radioName)
    userEvent.click(btnSearchRecipe)
    
    expect(history.location.pathname).toBe('/foods')
  })

  it('Rotas drinks', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => recipes
    }));

    const { history } =  renderWithRouter(<App />)

    history.push('/drinks')

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    userEvent.click(btnSearch)
    
    const inputSearch = screen.getByTestId('search-input')
    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    const radioName = screen.getByRole('radio', {
      name: /name/i
    })

  
    global.fetch = jest.fn(async () => ({
      json: async () => abcRecipe
    }));
    
    userEvent.type(inputSearch, 'abc')
    userEvent.click(radioName)
    userEvent.click(btnSearchRecipe)
    
    expect(history.location.pathname).toBe('/drinks')
  })

  it ('teste', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => recipes
    }));
    const { history } =  renderWithRouter(<App />)

    history.push('/foods');

      const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    userEvent.click(btnSearch)

    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    userEvent.click(btnSearchRecipe);
  })
})