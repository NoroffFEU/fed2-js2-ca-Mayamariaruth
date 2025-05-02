import{a as d,h as i}from"./headers-C2fTOECc.js";async function m(e){const c=`${d}/${e}/posts?_author=true`,n=await fetch(c,{headers:i()}),t=await n.json();if(!n.ok)throw new Error(error.errors?.[0]?.message||"Failed to fetch user's posts");return t.data}async function l(){const e=document.getElementById("author-feed-container"),n=new URLSearchParams(window.location.search).get("username");if(!n||!e){e.innerHTML="<p>User posts not found.</p>";return}try{const t=await m(n);e.innerHTML="";const s=document.createElement("h1");s.className="mt-4 mb-2 mx-4",s.textContent=`${n}'s posts`;const r=document.createElement("p");r.className="mx-4 mb-4",r.textContent=`${t.length} post${t.length!==1?"s":""}`,e.appendChild(s),e.appendChild(r),t.forEach(a=>{const o=document.createElement("div");o.className="card mx-auto mb-5 mt-4 text-white pt-1 post-card",o.innerHTML=`
          <div class="card-body">
            <h2 class="card-title mb-3">${a.title}</h2>
            <p class="card-text mb-3 h5">${a.body||""}</p>
            ${a.media?.url?`<img src="${a.media.url}" alt="${a.media.alt||"Post image"}" class="post-image img-fluid mb-4">`:""}
            <div class="mb-2">
              <span>By <strong>${a.author?.name||"Unknown Author"}</strong></span> |
              <span>${new Date(a.created).toLocaleDateString()}</span>
            </div>
          </div>
        `,e.appendChild(o)})}catch(t){console.error("Failed to render author's posts:",t),e.innerHTML="<p>Something went wrong while loading posts.</p>"}}l();
