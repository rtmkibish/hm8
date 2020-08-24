class List {

  static getToken() {
    const cookies = document.cookie.split(";");
    const rawToken = cookies.find(c => c.split("=")[0] === "authToken");
    const token = rawToken !== (-1) ? decodeURIComponent(rawToken.split("=")[1]) : null;
    return token;
  }

  constructor(username) {
    this.authorize(username);
  }

  authorize(username) {
    fetch('https://todo.hillel.it/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          value: username
        })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return new Error('Failed to get token')
      }
    })
    .then(json => {
      document.cookie = `authToken=${encodeURIComponent(json.access_token)};path=/`
      console.log('Authorized!');
    })
    .catch(err => console.log(err.message));
  }

  create(todo) {
    const token = List.getToken();

    fetch('https://todo.hillel.it/todo', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return new Error(res.status)
      }
      })
    .then(json => console.dir(json))
    .catch(err => console.error(err));
  }

  get(id) {
    const token = List.getToken();
    fetch(`https://todo.hillel.it/todo/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
      }
    )
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return new Error(res.status);
      }
    })
    .then(json => console.dir(json))
    .catch(err => console.error(err));
  }

  update(id, payload) {
    const token = List.getToken();
    fetch(`https://todo.hillel.it/todo/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
      }
    )
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return new Error(res.status);
      }
    })
    .then(json => console.dir(json))
    .catch(err => console.error(err));
  }

  toggle(id) {
    const token = List.getToken();
    fetch(`https://todo.hillel.it/todo/${id}/toggle`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
      }
    )
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return new Error(res.status);
      }
    })
    .then(json => console.dir(json))
    .catch(err => console.error(err));
  }

  delete(id) {
    const token = List.getToken();
    fetch(`https://todo.hillel.it/todo/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
      }
    )
    .then(res => {
      if (res.ok) {
        console.info("Deleted");
      } else {
        return new Error(res.status);
      }
    })
    .catch(err => console.error(err));
  }

  getTodos() {
    const token = List.getToken();
    fetch('https://todo.hillel.it/todo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
      }
    )
    .then(res => res.json())
    .then(json => console.dir(json));
  }
}