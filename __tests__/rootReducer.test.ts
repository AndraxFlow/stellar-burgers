import store from '../src/services/store';
import { burgerIngredientsSlice } from '../src/services/slices/burgerIngredientsSlice';
import { burgerConstructorSlice } from '../src/services/slices/burgerConstructorSlice';
import { feedSlice } from '../src/services/slices/feedSlice';
import { userSlice } from '../src/services/slices/userSlice';
import { ordersSlice } from '../src/services/slices/ordersSlice';

describe('Рут редьюсер', () => {
  it('должен корректно инициализировать все слайсы', () => {
    const testInitialState = store.getState();
    const expectedState = {
      burgerIngredients: burgerIngredientsSlice.getInitialState(),
      burgerConstructor: burgerConstructorSlice.getInitialState(),
      feeds: feedSlice.getInitialState(),
      user: userSlice.getInitialState(),
      orders: ordersSlice.getInitialState(),
    };

    expect(testInitialState).toEqual(expectedState);
  });
});
