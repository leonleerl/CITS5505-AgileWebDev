// Load users when page loads
$(document).ready(function () {
  loadUsers();
});

// CREATE: Create a new user
function createUser() {
  const name = $("#name").val();
  const email = $("#email").val();

  if (!name || !email) {
    alert("Please fill in all fields");
    return;
  }

  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "POST",
    data: {
      name: name,
      email: email,
    },
    success: function (response) {
      alert("User created successfully!");
      $("#name").val("");
      $("#email").val("");
      loadUsers();
    },
    error: function (xhr, status, error) {
      alert("Error creating user: " + error);
    },
  });
}

// READ: Load all users
function loadUsers() {
  $("#users").html('<div class="loading">Loading users...</div>');

  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET",
    success: function (users) {
      $("#users").empty();
      users.forEach(function (user) {
        $("#users").append(`
                    <div class="user-card" data-id="${user.id}">
                        <h3>${user.name}</h3>
                        <p>Email: ${user.email}</p>
                        <button class="update-btn" onclick="showUpdateForm(${user.id}, '${user.name}', '${user.email}')">
                            Update
                        </button>
                        <button class="delete-btn" onclick="deleteUser(${user.id})">
                            Delete
                        </button>
                    </div>
                `);
      });
    },
    error: function (xhr, status, error) {
      $("#users").html(
        `<div class="error">Error loading users: ${error}</div>`
      );
    },
  });
}

// UPDATE: Show update form
function showUpdateForm(id, name, email) {
  $("#updateUserId").val(id);
  $("#updateName").val(name);
  $("#updateEmail").val(email);
  $("#createUserForm").hide();
  $("#updateUserForm").show();
}

// UPDATE: Cancel update
function cancelUpdate() {
  $("#createUserForm").show();
  $("#updateUserForm").hide();
}

// UPDATE: Update user
function updateUser() {
  const id = $("#updateUserId").val();
  const name = $("#updateName").val();
  const email = $("#updateEmail").val();

  if (!name || !email) {
    alert("Please fill in all fields");
    return;
  }

  $.ajax({
    url: `https://jsonplaceholder.typicode.com/users/${id}`,
    method: "PUT",
    data: {
      id: id,
      name: name,
      email: email,
    },
    success: function (response) {
      alert("User updated successfully!");
      $("#createUserForm").show();
      $("#updateUserForm").hide();
      loadUsers();
    },
    error: function (xhr, status, error) {
      alert("Error updating user: " + error);
    },
  });
}

// DELETE: Delete user
function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    $.ajax({
      url: `https://jsonplaceholder.typicode.com/users/${id}`,
      method: "DELETE",
      success: function (response) {
        alert("User deleted successfully!");
        loadUsers();
      },
      error: function (xhr, status, error) {
        alert("Error deleting user: " + error);
      },
    });
  }
}
