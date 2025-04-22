import { getAllImages } from './js/pixabay-api';
import { imageTemplate, imagesTemplate } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  btnNext: document.querySelector('.gallery-btn'),
  loader: document.querySelector('.loader'),
};

let lightbox;

const params = {
  message: '',
  page: 1,
  total: 0,
  perPage: 40,
};

hidebtnNext();

refs.form.addEventListener('submit', searchImages);
refs.btnNext.addEventListener('click', loadMoreImages);

async function searchImages(e) {
  e.preventDefault();

  const message = e.target.elements.search.value.trim();

  if (!message) {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  resetGalleryState(message);
  showLoader();

  try {
    const result = await getAllImages(
      params.message,
      params.page,
      params.perPage
    );

    validateApiResponse(result);

    if (result.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    params.total = Math.min(result.totalHits, 500); // Pixabay API limit
    refs.gallery.innerHTML = imagesTemplate(result.hits);

    lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();

    checkBtnStatus();
  } catch (error) {
    showErrorToast(error);
    console.error('Search Error:', error);
  } finally {
    hideLoader();
    e.target.reset();
  }
}

async function loadMoreImages() {
  const maxPage = Math.ceil(params.total / params.perPage);

  if (params.page >= maxPage) {
    hidebtnNext();
    return;
  }

  params.page += 1;
  showLoader();
  hidebtnNext();

  try {
    const result = await getAllImages(
      params.message,
      params.page,
      params.perPage
    );

    validateApiResponse(result);

    refs.gallery.insertAdjacentHTML('beforeend', imagesTemplate(result.hits));
    lightbox.refresh();

    scrollPage();
    checkBtnStatus();
  } catch (error) {
    showErrorToast(error);
    console.error('Load More Error:', error);
  } finally {
    hideLoader();
  }
}

function checkBtnStatus() {
  const maxPage = Math.ceil(params.total / params.perPage);

  if (params.page < maxPage) {
    showbtnNext();
  } else {
    hidebtnNext();
    if (params.total > 0) {
      iziToast.info({
        position: 'topRight',
        message: "You've reached the end of search results.",
      });
    }
  }
}

function validateApiResponse(result) {
  if (
    !result ||
    typeof result.totalHits !== 'number' ||
    !Array.isArray(result.hits)
  ) {
    throw new Error('Invalid API response structure');
  }
}

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

function showbtnNext() {
  refs.btnNext.style.display = '';
}

function hidebtnNext() {
  refs.btnNext.style.display = 'none';
}

function scrollPage() {
  const firstCard = refs.gallery.firstElementChild;
  if (!firstCard) return;

  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

function resetGalleryState(message) {
  refs.gallery.innerHTML = '';
  hidebtnNext();
  params.message = message;
  params.page = 1;
  params.total = 0;
}

function showErrorToast(error) {
  iziToast.error({
    message: error?.message || 'Something went wrong. Please try again!',
    position: 'topRight',
  });
}
