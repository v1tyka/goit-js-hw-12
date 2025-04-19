import{a as b,i as c,S as w}from"./assets/vendor-BBSqv8W6.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(e){if(e.ep)return;e.ep=!0;const l=a(e);fetch(e.href,l)}})();async function u(r,s,a){const i="https://pixabay.com/api/",e={key:"49074776-667ebd81d42a28579e0443e2e",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:a};return(await b.get(i,{params:e})).data}function L(r){const{webformatURL:s,largeImageURL:a,tags:i,likes:e,views:l,comments:n,downloads:h}=r;return`<li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img
              class="gallery-image"
              src="${s}"
              alt="${i}"
            />
          </a>
          <div class="gallery-wrapper">
            <ul class="gallery-group">
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Likes</h2>
                <p class="gallery-txt">${e}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Views</h2>
                <p class="gallery-txt">${l}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Comments</h2>
                <p class="gallery-txt">${n}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Downloads</h2>
                <p class="gallery-txt">${h}</p>
              </li>
            </ul>
          </div>
        </li>`}function p(r){return r.map(L).join("")}const o={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),btnNext:document.querySelector(".gallery-btn"),loader:document.querySelector(".loader")};let m;const t={message:"",page:1,total:0,perPage:40};g();o.form.addEventListener("submit",x);async function x(r){r.preventDefault();const s=r.target.elements.search.value.trim();if(!s){c.warning({message:"Please enter a search term.",position:"topRight"});return}o.gallery.innerHTML="",g(),d(),t.message=s,t.page=1,t.total=0;try{const a=await u(t.message,t.page,t.perPage);if(a.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const i=p(a.hits);o.gallery.innerHTML=i,t.total=a.totalHits,m=new w(".gallery a"),y()}catch(a){c.error({message:a.message||"Something went wrong. Please try again!",position:"topRight"}),console.error(a)}finally{f(),r.target.reset()}}o.btnNext.addEventListener("click",P);async function P(){const r=Math.ceil(t.total/t.perPage);if(!(t.page>=r)){t.page+=1,g(),d();try{const s=await u(t.message,t.page,t.perPage),a=p(s.hits);o.gallery.insertAdjacentHTML("beforeend",a),m.refresh(),N(),y()}catch{c.error({title:"Error",message:"Something went wrong. Please try again.",position:"topRight"})}finally{f()}}}function y(){const r=Math.ceil(t.total/t.perPage);t.page<r?v():(g(),t.page!==1&&c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}function d(){o.loader.classList.remove("hidden")}function f(){o.loader.classList.add("hidden")}function v(){o.btnNext.style.display==="none"&&(o.btnNext.style.display="")}function g(){o.btnNext.style.display!=="none"&&(o.btnNext.style.display="none")}function N(){const r=o.gallery.firstElementChild;if(!r)return;const{height:s}=r.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
