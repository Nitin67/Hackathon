import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    entryTransaction,
    getAllTransactions
};
function getAllTransactions(userid){

  debugger;
    return fetch('http://localhost:8080/v1/bank-transaction/user/'+userid+'/transactions').then(
      response => {
          if (!response.ok) {
              return Promise.reject(response.statusText);
          }
          debugger;
          return response.json();
    });
}

function entryTransaction(amount,payeeID,userId){
var from=userId;
var amount=amount;
var transactionType='CREDIT';
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({from,amount,transactionType})
  };
debugger;
  return fetch('http://localhost:8080/v1/bank-transaction/user/'+payeeID+'/transaction', requestOptions).then(
    response => {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        debugger;
        return "success";
  });
}
function login(userId, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password })
    };
debugger;
    return fetch('http://localhost:8080/v1/bank-user/user', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            debugger;
            return response.json();
        })
        .then(user => {
          debugger;
            // login successful if there's a jwt token in the response
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + _id, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('http://localhost:8080/v1/bank-user/users', requestOptions).then(
      response => {
          if (!response.ok) {
              return Promise.reject(response.statusText);
          }

          return "success";
    });
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
  debugger;
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
