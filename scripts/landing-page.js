async function loadFeatures() {
  try {
    const featuresUrl = "https://industry-sprint-api-365b460ef11e.herokuapp.com/features";
    // const APIKey = "fea58e34-f7f6-4226-84ee-a90fb1b24043";

    // sends a get request using axios to the API using APIKey (in separate js file)
    const response = await axios.get(featuresUrl + "?api_key=" + APIKey);
    const data = response.data;

    // store the class element to be used for presenting API data in a variable "container"
    const container = document.querySelector(".features-container");

    // creating a const variable for the prefix URL of the API to extracting icons
    const imageBaseUrl = "https://industry-sprint-api-365b460ef11e.herokuapp.com";

    // Loops through each element in the data array starting at index 0
  for (let i = 0; i < data.length; i++) {
    const response = data[i];

    // Creates a <div> tag with the features-card class 
    const card = document.createElement("div");
    card.classList.add("features-card");

    // Creates a <img> tag with the icon image being requested from the API, class "features-card__icon" and creating an alt based on the title of the array. 
    const img = document.createElement("img");
    img.src = imageBaseUrl + response.icon;
    img.classList.add("features-card__icon");
    img.alt = response.title;

    // Creates an <h3> tag that requests the title of the Financial Health feature from the API
    const title = document.createElement("h3");
    title.textContent = response.title;
    title.classList.add("features-card__title");

    // Creates a <p> tag that requests the description of the Financial Health feature from the API
    const description = document.createElement("p");
    description.textContent = response.description;
    description.classList.add("features-card__description");

    // Adds the image, title and description inside the card <div>
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);

    // Adds the completed card to the "container" const which contains the features_container class
    container.appendChild(card);
  }
  } catch (error) {
    console.error("Network error:", error);
  }
}

loadFeatures();