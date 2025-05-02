import{A as r,h as n}from"./authorPosts-a1AKxWD9.js";import{s as i}from"./feed-BD9eirZ7.js";async function c(o){const a=`${r}/${o}?_author=true`,t=await fetch(a,{headers:n()});if(!t.ok){const e=await t.json();throw new Error(e.errors?.[0]?.message||"Failed to load post")}return(await t.json()).data}async function d(o){try{const a=await c(o),t=document.getElementById("post-page");t.innerHTML=`
      <div class="card mx-auto mb-5 mt-4 text-white pt-1 post-card">
        <div class="card-body">
          <h1 class="card-title mb-3">${a.title}</h1>
          <p class="card-text mb-3 h5">${a.body||""}</p>
            ${a.media?.url?`
              <img src="${a.media?.url}" alt="${a.media?.alt||"Post image"}" class="post-image img-fluid mb-4"> `:""}
          <div class="mb-2">
            <span>By
              <a href="/fed2-js2-ca-Mayamariaruth/profile/authorPosts/index.html?username=${a.author?.name}" class="author-link text-white text-decoration-underline">
                <strong>${a.author?.name||"Unknown Author"}</strong>
              </a>
            </span> -
            <span>${new Date(a.created).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    `}catch(a){console.error(a),i("Could not load the post.","error")}}const l=new URLSearchParams(window.location.search),s=l.get("id");s?d(s):console.error("No post ID found in URL.");
