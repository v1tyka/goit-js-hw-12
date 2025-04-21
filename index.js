import{a as b,i as c,S as w}from"./assets/vendor-BBSqv8W6.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(e){if(e.ep)return;e.ep=!0;const l=a(e);fetch(e.href,l)}})();async function p(t,s,a){const i="https://pixabay.com/api/",e={key:"49074776-667ebd81d42a28579e0443e2e",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:a};return(await b.get(i,{params:e})).data}function L(t){const{webformatURL:s,largeImageURL:a,tags:i,likes:e,views:l,comments:n,downloads:h}=t;return`<li class="gallery-item">
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
        </li>`}function m(t){return t.map(L).join("")}const o={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),btnNext:document.querySelector(".gallery-btn"),loader:document.querySelector(".loader")};let u;const r={message:"",page:1,total:0,perPage:40};g();o.form.addEventListener("submit",x);o.btnNext.addEventListener("click",P);async function x(t){t.preventDefault();const s=t.target.elements.search.value.trim();if(!s){c.warning({message:"Please enter a search term.",position:"topRight"});return}o.gallery.innerHTML="",g(),y(),r.message=s,r.page=1,r.total=0;try{const a=await p(r.message,r.page,r.perPage);if(a.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const i=m(a.hits);o.gallery.innerHTML=i,r.total=Math.min(a.totalHits,500),u=new w(".gallery a"),u.refresh(),d()}catch(a){c.error({message:a.message||"Something went wrong. Please try again!",position:"topRight"}),console.error(a)}finally{f(),t.target.reset()}}async function P(){const t=Math.ceil(r.total/r.perPage);if(!(r.page>=t)){r.page+=1,g(),y();try{const s=await p(r.message,r.page,r.perPage),a=m(s.hits);o.gallery.insertAdjacentHTML("beforeend",a),u.refresh(),N(),d()}catch{c.error({title:"Error",message:"Something went wrong. Please try again.",position:"topRight"})}finally{f()}}}function d(){const t=Math.ceil(r.total/r.perPage);r.page<t?v():(g(),c.info({position:"topRight",message:"You've reached the end of search results."}))}function y(){o.loader.classList.remove("hidden")}function f(){o.loader.classList.add("hidden")}function v(){o.btnNext.style.display==="none"&&(o.btnNext.style.display="")}function g(){o.btnNext.style.display!=="none"&&(o.btnNext.style.display="none")}function N(){const t=o.gallery.firstElementChild;if(!t)return;const{height:s}=t.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
