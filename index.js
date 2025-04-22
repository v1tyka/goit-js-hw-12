import{a as L,i as g,S as x}from"./assets/vendor-BBSqv8W6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function l(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=l(t);fetch(t.href,s)}})();async function p(e,r,l){const i="https://pixabay.com/api/",t={key:"49074776-667ebd81d42a28579e0443e2e",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:l};return(await L.get(i,{params:t})).data}function P(e){const{webformatURL:r,largeImageURL:l,tags:i,likes:t,views:s,comments:n,downloads:w}=e;return`<li class="gallery-item">
          <a class="gallery-link" href="${l}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${i}"
            />
          </a>
          <div class="gallery-wrapper">
            <ul class="gallery-group">
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Likes</h2>
                <p class="gallery-txt">${t}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Views</h2>
                <p class="gallery-txt">${s}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Comments</h2>
                <p class="gallery-txt">${n}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Downloads</h2>
                <p class="gallery-txt">${w}</p>
              </li>
            </ul>
          </div>
        </li>`}function m(e){return e.map(P).join("")}const o={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),btnNext:document.querySelector(".gallery-btn"),loader:document.querySelector(".loader")};let u;const a={message:"",page:1,total:0,perPage:40};c();o.form.addEventListener("submit",v);o.btnNext.addEventListener("click",S);async function v(e){e.preventDefault();const r=e.target.elements.search.value.trim();if(!r){g.warning({message:"Please enter a search term.",position:"topRight"});return}R(r),h();try{const l=await p(a.message,a.page,a.perPage);if(f(l),l.hits.length===0){g.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}a.total=Math.min(l.totalHits,500),o.gallery.innerHTML=m(l.hits),u=new x(".gallery a"),u.refresh(),d()}catch(l){b(l),console.error("Search Error:",l)}finally{y(),e.target.reset()}}async function S(){const e=Math.ceil(a.total/a.perPage);if(a.page>=e){c();return}a.page+=1,h(),c();try{const r=await p(a.message,a.page,a.perPage);f(r),o.gallery.insertAdjacentHTML("beforeend",m(r.hits)),u.refresh(),N(),d()}catch(r){b(r),console.error("Load More Error:",r)}finally{y()}}function d(){const e=Math.ceil(a.total/a.perPage);a.page<e?M():(c(),a.total>0&&g.info({position:"topRight",message:"You've reached the end of search results."}))}function f(e){if(!e||typeof e.totalHits!="number"||!Array.isArray(e.hits))throw new Error("Invalid API response structure")}function h(){o.loader.classList.remove("hidden")}function y(){o.loader.classList.add("hidden")}function M(){o.btnNext.style.display=""}function c(){o.btnNext.style.display="none"}function N(){const e=o.gallery.firstElementChild;if(!e)return;const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}function R(e){o.gallery.innerHTML="",c(),a.message=e,a.page=1,a.total=0}function b(e){g.error({message:(e==null?void 0:e.message)||"Something went wrong. Please try again!",position:"topRight"})}
//# sourceMappingURL=index.js.map
