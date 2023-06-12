export async function fetchUsers() {
    const response = await fetch('/users');
    const data = await response.json();
    return data;
  }
  
  export async function createUser(user) {
    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }
  
  export async function updateUser(userId, user) {
    const response = await fetch(`/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }
  
  export async function deleteUser(userId) {
    const response = await fetch(`/users/${userId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
  
  // Repeat the above functions for notes and payments
  