import{a as g,S as L,i as c}from"./assets/vendor-QphqWX9g.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const w="55388075-5b2240cf69458d8e2371e7c79";async function m(r,e=1){return(await g.get("https://pixabay.com/api/",{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:40}})).data}function p(r){return r.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" />
        </a>
        <div class="info">
          <p>Likes: ${e.likes}</p>
          <p>Views: ${e.views}</p>
          <p>Comments: ${e.comments}</p>
          <p>Downloads: ${e.downloads}</p>
        </div>
      </li>
    `).join("")}function v(r){r.innerHTML=""}const b=document.querySelector("#search-form"),l=document.querySelector("#gallery"),d=document.querySelector("#loader"),u=document.querySelector("#load-more");let a=1,i="",h=0,y=new L("#gallery a");b.addEventListener("submit",async r=>{if(r.preventDefault(),i=r.target.elements.searchQuery.value.trim(),!!i){a=1,v(l),u.classList.add("hidden"),d.classList.remove("hidden");try{const e=await m(i,a);if(h=e.totalHits,e.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}l.innerHTML=p(e.hits),y.refresh(),h>40&&u.classList.remove("hidden")}catch{c.error({message:"Something went wrong!"})}finally{d.classList.add("hidden")}}});u.addEventListener("click",async()=>{a+=1,d.classList.remove("hidden");try{const r=await m(i,a);l.insertAdjacentHTML("beforeend",p(r.hits)),y.refresh();const n=l.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"});const o=Math.ceil(h/40);a>=o&&(u.classList.add("hidden"),c.info({message:"We're sorry, but you've reached the end of search results."}))}catch{c.error({message:"Something went wrong!"})}finally{d.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
