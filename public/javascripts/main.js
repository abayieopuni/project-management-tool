// Show the modal for creating a project
function showCreateProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('hidden');
}

// Hide the modal for creating a project
function hideCreateProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.add('hidden');
}

// Form validation
document.querySelector('form').addEventListener('submit', function(event) {
  const projectName = document.querySelector('input[name="projectName"]').value;
  
  if (!projectName) {
    event.preventDefault(); // Prevent form submission if input is empty
    alert('Please enter a project name.');
  }
});
