import{A as e,h as n}from"./authorPosts-BrDXv11R.js";import{s as i}from"./feed-CEQZsA_4.js";async function c(o){const t=`${e}/${o}?_author=true`,a=await fetch(t,{headers:n()});if(!a.ok){const r=await a.json();throw new Error(r.errors?.[0]?.message||"Failed to load post")}return(await a.json()).data}async function d(o){try{const t=await c(o),a=document.getElementById("post-page");a.innerHTML=`
      <div class="card mx-auto mb-5 mt-4 text-white pt-1 post-card">
        <div class="card-body">
          <h1 class="card-title mb-3">${t.title}</h1>
          <p class="card-text mb-3 h5">${t.body||""}</p>
            ${t.media?.url?`
              <img src="${t.media?.url}" alt="${t.media?.alt||"Post image"}" class="post-image img-fluid mb-4"> `:""}
          <div class="mb-2">
            <span>By <strong>${t.author?.name||"Unknown Author"}</strong></span> | 
            <span>${new Date(t.created).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    `}catch(t){console.error(t),i("Could not load the post.","error")}}const l=new URLSearchParams(window.location.search),s=l.get("id");s?d(s):console.error("No post ID found in URL.");
