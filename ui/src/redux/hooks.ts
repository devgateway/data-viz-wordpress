 
import { ***REMOVED***, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const ***REMOVED*** = () => useDispatch<AppDispatch>();
export const ***REMOVED***: ***REMOVED***<RootState> = useSelector;
