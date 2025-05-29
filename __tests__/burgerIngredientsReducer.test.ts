import { burgerIngredientsSlice, fetchBurgerIngredients } from '../src/services/slices/burgerIngredientsSlice';
import { TIngredient } from '../src/utils/types';

jest.mock('../src/utils/burger-api', () => ({
  getIngredientsApi: jest.fn(),
}));

describe('burgerIngredients редьюсер', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Состояние загрузки', () => {
    it('должен установить статус loading при начале загрузки', () => {
      const testInitialState = burgerIngredientsSlice.getInitialState();
      const action = fetchBurgerIngredients.pending('requestId');
      
      const testState = burgerIngredientsSlice.reducer(testInitialState, action);
      
      expect(testState.status).toBe('loading');
      expect(testState.error).toBeNull();
    });
  });

  describe('Успешная загрузка', () => {
    it('должен обновить состояние при успешной загрузке ингредиентов', () => {
      const testIngredients: TIngredient[] = [{
        _id: '1',
        name: 'Тестовая булка',
        type: 'main',
        proteins: 7,
        fat: 4,
        carbohydrates: 13,
        calories: 95,
        price: 320,
        image: 'test_image.png',
        image_mobile: 'test_image_mobile.png',
        image_large: 'test_image_large.png',
        __v: 0
      }];

      const testInitialState = burgerIngredientsSlice.getInitialState();
      const action = fetchBurgerIngredients.fulfilled(testIngredients, 'requestId');
      
      const testState = burgerIngredientsSlice.reducer(testInitialState, action);
      
      expect(testState.status).toBe('succeeded');
      expect(testState.ingredients).toEqual(testIngredients);
      expect(testState.error).toBeNull();
    });
  });

  describe('Обработка ошибок', () => {
    it('должен установить статус failed при ошибке загрузки', () => {
      const testInitialState = burgerIngredientsSlice.getInitialState();
      const errorMessage = 'Ошибка загрузки данных';
      const action = fetchBurgerIngredients.rejected(new Error(errorMessage), 'requestId');
      
      const testState = burgerIngredientsSlice.reducer(testInitialState, action);
      
      expect(testState.status).toBe('failed');
      expect(testState.error).toBe(errorMessage);
    });
  });
});
