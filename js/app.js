const auth = "563492ad6f91700001000001f171af47cfc54e659670083dbc9b54f7";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
let searchValue;

//Events
searchInput.addEventListener("input", (e) => (searchValue = e.target.value));
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
  console.log(searchValue);
});

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated?per_page=15&page=1"
  );
  generatePictures(data);
}
curatedPhotos();

async function searchPhotos(query) {
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
  );

  generatePictures(data);
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
                <img src="${photo.src.large}"></img>
                <p>${photo.photographer}</p>
            `;
    gallery.appendChild(galleryImg);
  });
}
