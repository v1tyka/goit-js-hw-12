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
  page: null,
  total: 1,
  perPage: 40,
};

hidebtnNext();

refs.form.addEventListener('submit', searchImages);
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
  hidebtnNext(); // Сховати одразу
  showLoader(); // Показати лоадер

  params.message = message;
  params.page = 1;

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
    params.total = result.totalHits;

    checkBtnStatus();

    lightbox = new SimpleLightbox('.gallery a');
  } catch (error) {
    iziToast.error({
      message: error.message || 'Something went wrong. Please try again!',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader(); // Приховати лоадер у будь-якому випадку
    e.target.reset();
  }
}

refs.btnNext.addEventListener('click', async () => {
  hidebtnNext();
  showLoader();
  params.page += 1;

  try {
    const result2 = await getAllImages(
      params.message,
      params.page,
      params.perPage
    );

    const markup = imagesTemplate(result2.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    hideLoader();
    checkBtnStatus();
    scrollPage();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });
    hideLoader();
  }
});

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

function checkBtnStatus() {
  const maxPage = Math.ceil(params.total / params.perPage);

  if (params.page >= maxPage || params.total < params.perPage) {
    hidebtnNext();
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showbtnNext();
  }
}

function scrollPage() {
  const info = refs.gallery.firstElementChild.getBoundingClientRect();
  const height = info.height;
  window.scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}
