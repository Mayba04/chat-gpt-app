// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import {thunk} from 'redux-thunk';

// Функція для завантаження стану з LocalStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage', err);
    return undefined;
  }
};

// Функція для збереження стану в LocalStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState, // Ініціалізація стану з LocalStorage
});

store.subscribe(() => {
  saveState({
    user: store.getState().user, // Збереження лише частини стану, яку ви хочете зберігати
  });
});

export default store;
