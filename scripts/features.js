// ====== API CONFIG ======
    const API_BASE_URL = "https://industry-sprint-api-365b460ef11e.herokuapp.com";


// Fallback dataset if API request fails

const FALLBACK_PRODUCTS = [
{
    id: "financial-pulse",
    name: "TD Financial Pulse",
    description: {
    paragraph:
        "Get a clear, real-time view of your overall financial rhythm and wellbeing. TD Financial Pulse brings together your income, expenses, savings, credit, and investments in one secure dashboard — turning complex data into actionable insights.",
    bulletPoints: [
        "Instantly see your TD Financial Health Score.",
        "Visualize spending and saving patterns.",
        "Identify key areas of improvement.",
        "Compare month-over-month progress."
    ]
    },
    image: "../assets/images/features-1.png"
},
{
    id: "financial-vitals",
    name: "TD Financial Vitals",
    description: {
    paragraph:
        "TD Financial Vitals helps you create, manage, and optimize your budget automatically. Powered by intelligent categorization, it learns from your habits and suggests personalized adjustments to help you meet your goals.",
    bulletPoints: [
        "Auto-track and categorize spending.",
        "Set flexible budgets by category or goal.",
        "Receive alerts when you're off track.",
        "Access month-end insights and summaries."
    ]
    },
    image: "../assets/images/features-2.png"

},
{
    id: "financial-horizons",
    name: "TD Financial Horizons",
    description: {
    paragraph:
        "TD Financial Horizons is your on-demand financial wellness guide, helping to build better financial habits. Using advanced analytics, it identifies opportunities to improve your financial habits and connects you with TD tools, education, and experts.",
    bulletPoints: [
        "Get AI-driven recommendations based on your data.",
        "Access personalized learning modules and articles.",
        "Connect with TD advisors when you need deeper support."
    ]
    },
    image: "../assets/images/features-3.png"
}
];



// ====== DOM REFS ======

// Container where all product cards will be injected.
    const productsListEl = document.getElementById("productsList");

// ====== STATUS HELPERS ======
// Show a loading message while we wait for the API to respond.
function renderLoading() { 
    productsListEl.innerHTML =
    `<p class="products__status">Loading TD Financial Health tools...</p>`;
}

/**
 * Render an error / status message in the products area.
 * Optionally show a "Try again" button that re-runs the API call.
 *
 * @param {string} message - Text to show to the user.
 * @param {object} options - Configuration object.
 * @param {boolean} options.showRetry - Whether to show the "Try again" button.
 */

    function renderError(
        message = "Something went wrong. Please try again later.",
        { showRetry = true } = {}
    ) {
        const retryButtonHTML = showRetry
        ? `<button type="button" class="products__retry">Try again</button>`
        : "";
    
        productsListEl.innerHTML = `
        <div class="products__status products__status--error">
            <p>${message}</p>
            ${retryButtonHTML}
        </div>`;
    
// If enabled, wire up the retry button to call fetchProducts again.
if (showRetry) {
    const retryBtn = document.querySelector(".products__retry");
    if (retryBtn) {
        retryBtn.addEventListener("click", () => {
        fetchProducts();
        });
    }
    }
}

// ====== CARD FACTORY ======
    /**
     * Turn a single product object into a TD-branded HTML card string.
     *
     * @param {object} product - One product from the /products API.
     * @param {number} index - Position in the array (used to alternate layout).
     * @returns {string} HTML markup for one product card.
     */
    function createProductCard(product, index) {
    const { id, name, description, image } = product;

// Safely read nested description fields (optional chaining for safety).
    
    const paragraph = description?.paragraph || "";
    const bulletPoints = description?.bulletPoints || [];

// Build full image URL:
        
    let imageUrl = "";
        if (typeof image === "string" && image.length > 0) {
            // If it looks like a URL from the API, prepend API_BASE_URL
            if (image.startsWith("/")) {
                imageUrl = `${API_BASE_URL}${image}`;
            } else {
                // Otherwise, assume it's a local path
                imageUrl = image;
            }
        }
        


// Turn bulletPoints array into <li> items.

        const bulletsHTML = bulletPoints
        .map((point) => `<li class="products__card-bullet">${point}</li>`)
        .join("");
        
        

// Middle card gets reversed layout on desktop features product card.
        const cardModifier = index === 1 ? " products__card--reverse " : "";

// Return full card markup (image + text + CTA).
        return `
            <article class="products__card${cardModifier}" data-id="${id}">
            <div class="products__card-media">
                <img
                class="products__card-image"
                src="${imageUrl}"
                alt="${name}"
                />
            </div>

            <div class="products__card-body">
                <h3 class="products__card-title">${name}</h3>
                <p class="products__card-text">${paragraph}</p>

                <ul class="products__card-list">
                ${bulletsHTML}
                </ul>

                <button class="products__card-cta" type="button">
                Learn more
                </button>
            </div>
            </article>`;
}


// ====== RENDER ALL PRODUCTS ======
/**
 * Take an array of products and render them into the DOM.
 *
 * @param {Array} products - Array of product objects from the API or fallback.
 */
function renderProducts(products) {
// If data is missing or empty, show an informative message.

if (!Array.isArray(products) || products.length === 0) {
    renderError(
    "No financial health tools are available right now. Please check back soon.",
    { showRetry: false } // No point retrying if the data is truly empty.
    ); return;
}

// Map each product to a card and join into a single HTML string.

const cardsHTML = products
    .map((product, index) => createProductCard(product, index))
    .join("");

// Inject all cards into the products list container.

productsListEl.innerHTML = cardsHTML;
}

// Fetch products from API and handle loading/error/fallback
async function fetchProducts() {

try { // Step 1: Inform user that data is being loaded.
renderLoading();
await new Promise((resolve) => setTimeout(resolve, 500));

// Step 2: Make GET request to /products with API key as a query parameter.
const response = await axios.get(`${API_BASE_URL}/products`, {
params: { api_key: APIKey }
});

// Step 3: Extract the products array from the response body.
const products = response.data;

// Step 4: Render the products into cards.
renderProducts(products);
} catch (error) {
// Log error for developers.
console.error("Error fetching products:", error);

// If live API fails, try using the local fallback dataset for demo stability.
if (Array.isArray(FALLBACK_PRODUCTS) && FALLBACK_PRODUCTS.length > 0) {
console.warn("Using fallback products.");
renderProducts(FALLBACK_PRODUCTS);
} else {

// If no fallback is available, show a user-friendly error message.
renderError("Unable to load TD Financial Health tools right now.");
}
}
}

// ====== INIT ======
document.addEventListener("DOMContentLoaded", fetchProducts);