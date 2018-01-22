import { SecureStore } from 'expo';

const Api = {
  _listeners: [],
  getToken: async function() {
    this._token = await SecureStore.getItemAsync('token');
    return this._token;
  },
  setToken: function(token) {
    this._token = token;
    SecureStore.setItemAsync('token', token);
    this.notify(token);
  },
  deleteToken: function() {
    SecureStore.deleteItemAsync('token');
    this.notify(undefined);
  },
  addTokenListener: function(listener) {
    this._listeners.push(listener)
  },
  removeTokenListener: function(listener) {
    const index = this._listeners.indexOf(listener);
    if(~index) this._listeners.splice(index, 1);
  },
  notify: function(token) {
    for(var i = 0;i < this._listeners.length;i++) {
      this._listeners[i](token);
    }
  },
  fetchUser: async function() {
    return await fetch(`https://api.instagram.com/v1/users/self/?access_token=${this._token}`);
  },
  fetchFollows: async function() {
    return await fetch(`https://api.instagram.com/v1/users/self/follows?access_token=${this._token}`);
  },
  fetchFollowedBy: async function() {
    return await fetch(`https://api.instagram.com/v1/users/self/followed-by?access_token=${this._token}`);
  },
  unfollow: async function(id) {
    const data = 'action=unfollow';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
    };
    return await fetch(`https://api.instagram.com/v1/users/${id}/relationship?access_token=${this._token}`, {
      method: 'POST',
      headers,
      body: data
    });
  },
  follow: async function(id) {
    const data = 'action=follow';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
    };
    return await fetch(`https://api.instagram.com/v1/users/${id}/relationship?access_token=${this._token}`, {
      method: 'POST',
      headers,
      body: data
    });
  }
};

export default Api;
