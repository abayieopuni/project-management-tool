function showCreateProjectModal() {
  document.getElementById('projectModal').style.display = 'block';
}

function hideCreateProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Form validation for creating a project
document.querySelector('form').addEventListener('submit', function(event) {
  const projectName = document.querySelector('input[name="projectName"]').value;
  
  if (!projectName) {
    event.preventDefault(); // Prevent form submission if the input is empty
    alert('Please enter a project name.');
  }
});


// Authentication logic to handle links based on JWT
document.addEventListener('DOMContentLoaded', function() {
  const authLinks = document.getElementById('auth-links');
  const token = localStorage.getItem('token'); // Get the JWT from localStorage

  if (token) {
    // Decode the JWT token to get user information (payload is the middle part of the JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload.role;

    // If token exists, show Dashboard, Logout, and Admin (if user is admin)
    authLinks.innerHTML += `
      <li><a href="/dashboard">Dashboard</a></li>
      ${userRole === 'admin' ? '<li><a href="/admin">Admin</a></li>' : ''}
      <li><a href="#" id="logout">Logout</a></li>
    `;

    // Logout function to remove the token and redirect to login
    document.getElementById('logout').addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('token'); // Remove the JWT from localStorage
      window.location.href = '/auth/login';  // Redirect to login page after logout
    });
  } else {
    // If no token exists, show Login and Register
    authLinks.innerHTML += `
      <li><a href="/auth/login">Login</a></li>
      <li><a href="/auth/register">Register</a></li>
    `;
  }
});
