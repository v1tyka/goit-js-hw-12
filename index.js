import{a as b,i as c,S as w}from"./assets/vendor-BBSqv8W6.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=l(e);fetch(e.href,a)}})();async function p(t,s,l){const i="https://pixabay.com/api/",e={key:"49074776-667ebd81d42a28579e0443e2e",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:l};return(await b.get(i,{params:e})).data}function L(t){const{webformatURL:s,largeImageURL:l,tags:i,likes:e,views:a,comments:n,downloads:f}=t;return`<li class="gallery-item">
          <a class="gallery-link" href="${l}">
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
                <p class="gallery-txt">${a}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Comments</h2>
                <p class="gallery-txt">${n}</p>
              </li>
              <li class="gallery-list">
                <h2 class="gallery-subtitle">Downloads</h2>
                <p class="gallery-txt">${f}</p>
              </li>
            </ul>
          </div>
        </li>`}function m(t){return t.map(L).join("")}const o={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),btnNext:document.querySelector(".gallery-btn"),loader:document.querySelector(".loader")};let d;const r={message:"",page:null,total:1,perPage:40};g();o.form.addEventListener("submit",x);async function x(t){t.preventDefault();const s=t.target.elements.search.value.trim();if(!s){c.warning({message:"Please enter a search term.",position:"topRight"});return}o.gallery.innerHTML="",g(),y(),r.message=s,r.page=1;try{const l=await p(r.message,r.page,r.perPage);if(l.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const i=m(l.hits);o.gallery.innerHTML=i,r.total=l.totalHits,h(),d=new w(".gallery a")}catch(l){c.error({message:l.message||"Something went wrong. Please try again!",position:"topRight"}),console.error(l)}finally{u(),t.target.reset()}}o.btnNext.addEventListener("click",async()=>{g(),y(),r.page+=1;try{const t=await p(r.message,r.page,r.perPage),s=m(t.hits);o.gallery.insertAdjacentHTML("beforeend",s),d.refresh(),u(),h(),v()}catch{c.error({title:"Error",message:"Something went wrong. Please try again.",position:"topRight"}),u()}});function y(){o.loader.classList.remove("hidden")}function u(){o.loader.classList.add("hidden")}function P(){o.btnNext.style.display=""}function g(){o.btnNext.style.display="none"}function h(){const t=Math.ceil(r.total/r.perPage);r.page>=t||r.total<r.perPage?(g(),c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):P()}function v(){const s=o.gallery.firstElementChild.getBoundingClientRect().height;window.scrollBy({behavior:"smooth",top:s*2})}
//# sourceMappingURL=index.js.map
