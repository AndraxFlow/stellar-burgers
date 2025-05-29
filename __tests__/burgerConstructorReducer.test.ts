import { burgerConstructorSlice, addIngredient, removeIngredient, moveIngredient } from '../src/services/slices/burgerConstructorSlice';
import { TIngredient } from '../src/utils/types';

jest.mock('../src/utils/burger-api', () => ({
  orderBurgerApi: jest.fn(),
}));

describe('Редьюсер слайса constructor', ()=> {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    it('Обработка экшена добавления ингредиента', () => {
      const ingredient: TIngredient = {
        _id: '1',
        name: 'Ingredient',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png',
        __v: 0
      };
      const initialState = burgerConstructorSlice.getInitialState();
      const action = addIngredient(ingredient);
      const state = burgerConstructorSlice.reducer(initialState, action);
  
      expect(state.constructorItems.ingredients).toContainEqual(ingredient);
    });
    
    it('Обработка экшена удаления ингредиента', () => {
      const ingredient: TIngredient = {
        _id: '1',
        name: 'Ingredient',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png',
        __v: 0
      };
  
      const initialState = {
        ...burgerConstructorSlice.getInitialState(),
        constructorItems: {
          bun: null,
          ingredients: [ingredient],
        },
      };
      const action = removeIngredient(0);
      const state = burgerConstructorSlice.reducer(initialState, action);
      expect(state.constructorItems.ingredients).not.toContainEqual(ingredient);
    });
  
    it('Обработка экшена изменения порядка ингредиентов в начинке', () => {
      const ingredient1: TIngredient = {
        _id: '1',
        name: 'Ingredient',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png',
        __v: 0
      };
  
      const ingredient2: TIngredient = {
        _id: '2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 15,
        fat: 10,
        carbohydrates: 25,
        calories: 150,
        price: 75,
        image: 'image2.png',
        image_mobile: 'image2_mobile.png',
        image_large: 'image2_large.png',
        __v: 0
      };
  
      const initialState = {
        ...burgerConstructorSlice.getInitialState(),
        constructorItems: {
          bun: null,
          ingredients: [ingredient1, ingredient2],
        },
      };
  
      const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
      const state = burgerConstructorSlice.reducer(initialState, action);
      expect(state.constructorItems.ingredients).toEqual([ingredient2, ingredient1]);
    });
  });