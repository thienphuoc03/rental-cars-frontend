import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface Car {
  carId: number;
  carName: string;
  pricePerDay: number;
  images: string;
  startDate: string;
  endDate: string;
  deposits: number;
  totalAmount: number;
}

interface CartItem {
  car: Car;
}

interface CartState {
  items: CartItem[] | [];
  addItem: (car: any) => void;
  removeItem: (carId: string) => void;
  clearCart: () => void;
}

const loadCartState = () => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = localStorage.getItem('cart-storage');
      return serializedState ? JSON.parse(serializedState) : undefined;
    }
  } catch (error) {
    toast.error('Error loading cart state from localStorage');
    return undefined;
  }
};

const saveCartState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart-storage', serializedState);
  } catch (error) {
    toast.error('Error saving cart state to localStorage');
  }
};

const initialState: CartState = loadCartState() || {
  items: [],
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items = loadCartState().items;
      const exitsCar = state.items.find(
        (item: any) => item?.carId === action.payload?.carId,
      );
      if (exitsCar) {
        toast.error('Xe đã tồn tại trong giỏ hàng');
        return;
      } else {
        state.items = [...state.items, action.payload];
        saveCartState(state);
        toast.success('Đã thêm xe vào giỏ hàng');
      }
    },
    removeItem(state, action) {
      state.items = loadCartState().items;
      state.items = state.items.filter(
        (item: any) => item?.carId !== action.payload,
      );
      saveCartState(state);
      toast.success('Đã xóa xe khỏi giỏ hàng');
    },
    clearCart: (state) => {
      state.items = [];
      saveCartState(state);
    },
  },
});

export { loadCartState, saveCartState };
export const { addItem, removeItem, clearCart } = cartReducer.actions;
export default cartReducer.reducer;
