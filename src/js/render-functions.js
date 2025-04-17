export function imageTemplate(item) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;

  return `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
            />
          </a>
          <div class="gallery-wrapper">
            <ul class="gallery-group">
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Likes</h2>
                <p class="gallery-txt">${likes}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Views</h2>
                <p class="gallery-txt">${views}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Comments</h2>
                <p class="gallery-txt">${comments}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Downloads</h2>
                <p class="gallery-txt">${downloads}</p>
              </li>
            </ul>
          </div>
        </li>`;
}

export function imagesTemplate(arr) {
  return arr.map(imageTemplate).join('');
}
export function renderGallery(images) {
  const galleryContainer = document.querySelector('.gallery'); // вибирає контейнер для галереї
  const galleryHTML = imagesTemplate(images); // генерує HTML для галереї
  galleryContainer.innerHTML = galleryHTML; // вставляє HTML в контейнер
}
export function clearGallery() {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = ''; // очищує контейнер
}
export function toggleLoader(isLoading) {
  const loader = document.querySelector('.loader'); // елемент лоадера
  if (isLoading) {
    loader.classList.remove('hidden'); // показує лоадер
  } else {
    loader.classList.add('hidden'); // ховає лоадер
  }
}
export function toggleLoadMoreButton(isVisible) {
  const loadMoreButton = document.querySelector('.load-more'); // кнопка завантаження
  if (isVisible) {
    loadMoreButton.classList.remove('hidden'); // показує кнопку
  } else {
    loadMoreButton.classList.add('hidden'); // ховає кнопку
  }
}
