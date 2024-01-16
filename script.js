const apiKey = "55ae08549c12483183294ee368e6f7a7";
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "in";
const options = ["General","Entertainment","Health","Science", "Sports", "Technology"];

const generateUI = (articles) => {
  container.innerHTML = articles.map((item) => `
    <div class="news-card">
      <div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
      </div>
      <div class="news-content">
        <div class="news-title">
          ${item.title}
        </div>
        <div class="news-description">
          ${item.description || item.content || ""}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>
    </div>
  `).join('');
};

const getNews = async (category = "general") => {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`);
    if (!response.ok) {
      throw new Error("Data unavailable at the moment. Please try again later");
    }
    const data = await response.json();
    generateUI(data.articles);
  } catch (error) {
    alert(error.message);
  }
};

const selectCategory = (category) => {
  const options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  category.classList.add("active");
  getNews(category.innerText.toLowerCase());
};

const createOptions = () => {
  optionsContainer.innerHTML = options.map((option, index) => `
    <button class="option ${index === 0 ? "active" : ""}" onclick="selectCategory(this)">${option}</button>
  `).join('');
};

const init = async () => {
  createOptions();
  await getNews();
};

window.onload = init;