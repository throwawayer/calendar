import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export const useShallowEqualSelector = (selector) => useSelector(selector, shallowEqual);
export const useAppDispatch = () => useDispatch();
