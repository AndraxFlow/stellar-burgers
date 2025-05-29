import { feedSlice, fetchOrders } from '../src/services/slices/feedSlice';
import { TFeedsResponse } from '../src/utils/burger-api';

jest.mock('../src/utils/burger-api', () => ({
  getFeedsApi: jest.fn(),
}));

describe('Лента заказов', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Загрузка заказов', () => {
    it('должен установить статус загрузки', () => {
      const testInitialState = feedSlice.getInitialState();
      const action = fetchOrders.pending('requestId');
      const testState = feedSlice.reducer(testInitialState, action);
  
      expect(testState.status).toBe('loading');
      expect(testState.error).toBeNull();
    });
  
    it('должен обновить состояние при успешной загрузке', () => {
      const testFeeds: TFeedsResponse = {
        success: true,
        orders: [
          {
            _id: '1',
            ingredients: ['testIngredient1', 'testIngredient2'],
            status: 'done',
            name: 'Order 1',
            createdAt: '2023-10-01T00:00:00Z',
            updatedAt: '2023-10-01T00:00:00Z',
            number: 1,
          },
        ],
        total: 1,
        totalToday: 1,
      };
  
      const testInitialState = feedSlice.getInitialState();
      const action = fetchOrders.fulfilled(testFeeds, 'requestId');
      const testState = feedSlice.reducer(testInitialState, action);
  
      expect(testState.status).toBe('succeeded');
      expect(testState.feeds).toEqual(testFeeds);
      expect(testState.error).toBeNull();
    });
  
    it('должен обработать ошибку загрузки', () => {
      const testInitialState = feedSlice.getInitialState();
      const errorMessage = 'Ошибка загрузки заказов';
      const action = fetchOrders.rejected(new Error(errorMessage), 'requestId');
      const testState = feedSlice.reducer(testInitialState, action);
  
      expect(testState.status).toBe('failed');
      expect(testState.error).toBe(errorMessage);
    });
  });
});
  