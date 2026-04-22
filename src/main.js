
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


let lightbox = new SimpleLightbox("#gallery a");


form.addEventListener("submit", async e => {
  e.preventDefault();

  const query = e.target.elements.searchQuery.value.trim();

  
  if (!query) {
    iziToast.warning({
      message: "Please enter a search term!",
    });
    return;
  }

  
  clearGallery(gallery);

  
  loader.classList.remove("hidden");

  try {
    const data = await fetchImages(query);

   
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    
    const markup = createMarkup(data.hits);

    
    gallery.innerHTML = markup;

    
    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      message: "Something went wrong!",
    });
  } finally {
    
    loader.classList.add("hidden");
    form.reset();
  }
});