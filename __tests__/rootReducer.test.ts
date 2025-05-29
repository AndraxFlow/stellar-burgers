
import store from '../src/services/store';
import { burgerIngredientsSlice } from '../src/services/slices/burgerIngredientsSlice';
import { burgerConstructorSlice } from '../src/services/slices/burgerConstructorSlice';
import { feedSlice } from '../src/services/slices/feedSlice';
import { userSlice } from '../src/services/slices/userSlice';
import { ordersSlice } from '../src/services/slices/ordersSlice';

describe('Тесты состояний', () => {
    it('Проверка правильной инициализации rootReducer', () => {
      const state = store.getState();
  
      expect(state).toEqual({
        burgerIngredients: burgerIngredientsSlice.getInitialState(),
        burgerConstructor: burgerConstructorSlice.getInitialState(),
        feeds: feedSlice.getInitialState(),
        user: userSlice.getInitialState(),
        orders: ordersSlice.getInitialState(),
      });
    });
});
