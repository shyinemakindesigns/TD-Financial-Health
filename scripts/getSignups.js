
async function loadUsers() {
    try {
        const userTable = document.getElementById("userTable");
        const response = await axios.get(`https://industry-sprint-api-365b460ef11e.herokuapp.com/signups?api_key=${APIKey}`);
        const users = response.data;

        users.forEach((user) => {
            //log to console
            console.log("First Name:", user.firstName);
            console.log("Last Name:", user.lastName);
            console.log("Email:", user.email);
            console.log("User ID:", user.id);


            // Make a new row
            const row = document.createElement("div");
            row.classList.add("userTable__Row")

            // First Name
            const firstNameCol = document.createElement("div");
            firstNameCol.classList.add("first_Name");
            firstNameCol.textContent = user.firstName;

            // Last name
            const lastNameCol = document.createElement("div");
            lastNameCol.classList.add("last_Name");
            lastNameCol.textContent = user.lastName;

            // Email
            const emailCol = document.createElement("div");
            emailCol.classList.add("email");
            emailCol.textContent = user.email;

            // Append to row
            row.appendChild(firstNameCol);
            row.appendChild(lastNameCol);
            row.appendChild(emailCol);

            // Append row to table container
            userTable.appendChild(row);
        }
        )

    } catch (error) {
        console.error("Error loading user signups");
}
}

// Run function
loadUsers();
