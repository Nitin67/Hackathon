import { userConstants } from '../_constants';

export function transaction(state = {}, action) {
  switch (action.type) {
    case 'TRANSACTION_COMPLETED':
      return { transaction: true };
    case 'TRANSACTION_FETCHED':
     return {data:action.data};
    default:
      return state
  }
}
