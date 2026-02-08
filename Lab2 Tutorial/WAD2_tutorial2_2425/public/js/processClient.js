document
  .getElementById("processForm")
  .addEventListener("submit", displayName);

function displayName(evt) {
  evt.preventDefault(); // Prevent form from submitting

  // Get user inputs
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("surname").value;

  let output = document.getElementById("output");
  output.innerHTML = ""; // Clear previous results

  let fullName = document.createElement("p");
  fullName.innerText = firstName + " " + lastName;
  output.appendChild(fullName);
}
