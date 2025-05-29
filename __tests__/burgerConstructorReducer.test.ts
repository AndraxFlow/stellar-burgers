import { burgerConstructorSlice, addIngredient, removeIngredient, moveIngredient } from '../src/services/slices/burgerConstructorSlice';
import { TIngredient } from '../src/utils/types';

jest.mock('../src/utils/burger-api', () => ({
  orderBurgerApi: jest.fn(),
}));

describe('Конструктор редьюсер', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  const testIngredient: TIngredient = {
    _id: '1',
    name: 'Тест начинка',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'test_image.png',
    image_mobile: 'test_image_mobile.png',
    image_large: 'test_image_large.png',
    __v: 0
  };

  const testIngredient2: TIngredient = {
    _id: '2',
    name: 'Вторая начинка',
    type: 'main',
    proteins: 15,
    fat: 10,
    carbohydrates: 25,
    calories: 150,
    price: 75,
    image: 'test_image2.png',
    image_mobile: 'test_image2_mobile.png',
    image_large: 'test_image2_large.png',
    __v: 0
  };
  
  describe('Добавление ингредиентов', () => {
    it('должен добавить ингредиент в конструктор', () => {
      const testInitialState = burgerConstructorSlice.getInitialState();
      const action = addIngredient(testIngredient);
      const testState = burgerConstructorSlice.reducer(testInitialState, action);
  
      expect(testState.constructorItems.ingredients).toContainEqual(testIngredient);
    });
  });
  
  describe('Удаление ингредиентов', () => {
    it('должен удалить ингредиент из конструктора', () => {
      const testInitialState = {
        ...burgerConstructorSlice.getInitialState(),
        constructorItems: {
          bun: null,
          ingredients: [testIngredient],
        },
      };
      const action = removeIngredient(0);
      const testState = burgerConstructorSlice.reducer(testInitialState, action);
      
      expect(testState.constructorItems.ingredients).not.toContainEqual(testIngredient);
    });
  });

  describe('Перемещение ингредиентов', () => {
    it('должен изменить порядок ингредиентов', () => {
      const testInitialState = {
        ...burgerConstructorSlice.getInitialState(),
        constructorItems: {
          bun: null,
          ingredients: [testIngredient, testIngredient2],
        },
      };
  
      const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
      const testState = burgerConstructorSlice.reducer(testInitialState, action);
      
      expect(testState.constructorItems.ingredients).toEqual([testIngredient2, testIngredient]);
    });
  });
});