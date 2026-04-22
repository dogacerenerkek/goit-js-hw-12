
import "./css/styles.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import { fetchImages } from "./js/pixabay-api";
import { createMarkup, clearGallery } from "./js/render-functions";


const form = document.querySelector("#search-form");
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const loadMoreBtn = document.querySelector("#load-more");

let page = 1;
let currentQuery = "";
let totalHits = 0;


let lightbox = new SimpleLightbox("#gallery a");


form.addEventListener("submit", async e => {
  e.preventDefault();

  currentQuery =
    e.target.elements.searchQuery.value.trim();

  if (!currentQuery) {
    return;
  }

  
  page = 1;

  clearGallery(gallery);

  loadMoreBtn.classList.add("hidden");

  loader.classList.remove("hidden");

  try {
    const data = await fetchImages(
      currentQuery,
      page
    );

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
      });

      return;
    }

    gallery.innerHTML = createMarkup(data.hits);

    lightbox.refresh();

    
    if (totalHits > 40) {
      loadMoreBtn.classList.remove("hidden");
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong!",
    });
  } finally {
    loader.classList.add("hidden");
  }
});
loadMoreBtn.addEventListener("click", async () => {
  
  page += 1;

  
  loader.classList.remove("hidden");

  try {
    
    const data = await fetchImages(currentQuery, page);

    
    gallery.insertAdjacentHTML(
      "beforeend",
      createMarkup(data.hits)
    );

    
    lightbox.refresh();

   
    const card = gallery.firstElementChild;

    const cardHeight =
      card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

   
    const totalPages = Math.ceil(totalHits / 40);

  
    if (page >= totalPages) {
      loadMoreBtn.classList.add("hidden");

      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong!",
    });
  } finally {
    loader.classList.add("hidden");
  }
});
