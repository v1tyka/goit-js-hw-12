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

  refs.gallery.innerHTML = '';
  hidebtnNext();
  showLoader();

  params.message = message;
  params.page = 1;
  params.total = 0;

  try {
    const result = await getAllImages(
      params.message,
      params.page,
      params.perPage
    );

    if (result.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    const markup = imagesTemplate(result.hits);
    refs.gallery.innerHTML = markup;

    // Обмеження до 500
    params.total = Math.min(result.totalHits, 500);

    lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();

    checkBtnStatus();
  } catch (error) {
    iziToast.error({
      message: error.message || 'Something went wrong. Please try again!',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
    e.target.reset();
  }
}

async function loadMoreImages() {
  const maxPage = Math.ceil(params.total / params.perPage);
  if (params.page >= maxPage) return;

  params.page += 1;
  hidebtnNext();
  showLoader();

  try {
    const result = await getAllImages(
      params.message,
      params.page,
      params.perPage
    );

    const markup = imagesTemplate(result.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    scrollPage();
    checkBtnStatus();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });
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

    iziToast.info({
      position: 'topRight',
      message: "You've reached the end of search results.",
    });
  }
}

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

function showbtnNext() {
  if (refs.btnNext.style.display === 'none') {
    refs.btnNext.style.display = '';
  }
}

function hidebtnNext() {
  if (refs.btnNext.style.display !== 'none') {
    refs.btnNext.style.display = 'none';
  }
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
