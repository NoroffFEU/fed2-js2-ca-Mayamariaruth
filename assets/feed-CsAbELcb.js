import{A as g,h as u,a as x}from"./headers-C2fTOECc.js";import{s as i,g as w,a as v,i as P}from"./app-BmnxwPbW.js";import{r as $}from"./read-DmHqR6i0.js";async function y(){const t=new URL(g);t.searchParams.append("_author","true");const e=await fetch(t,{headers:u()});if(!e.ok){const s=await e.json();throw new Error(s.message||"Failed to load posts")}const{data:o}=await e.json();return o}async function L(t){const e=new URL(`${g}/search`);e.searchParams.append("q",t),e.searchParams.append("_author","true");const o=await fetch(e,{headers:u()});if(!o.ok){const s=await o.json();throw new Error(s.errors?.[0]?.message||"Failed to search posts")}return await o.json()}async function B(t){const e=`${g}/${t}`,o=await fetch(e,{method:"DELETE",headers:u()});if(!o.ok){const s=await o.json();throw new Error(s.errors?.[0]?.message||"Failed to delete post")}return!0}function S(t){const o=t.currentTarget.dataset.id,n=`
      <div class="modal fade" id="delete-post-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content rounded-3">
            <div class="modal-header">
              <h3 class="modal-title">Confirm Deletion</h3>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete your post <strong>${t.target.closest(".post-box").querySelector(".post-title")?.innerText||"this post"}</strong>?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-light rounded-2" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger rounded-2" id="confirm-delete-btn" data-id="${o}">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",n);const r=document.getElementById("delete-post-modal");if(r){const l=document.getElementById("confirm-delete-btn");l&&l.addEventListener("click",U),new bootstrap.Modal(r).show()}}async function U(t){const o=t.currentTarget.dataset.id;try{await B(o),i("Post deleted successfully!","success");const s=document.getElementById("delete-post-modal"),a=bootstrap.Modal.getInstance(s);a&&a.hide(),s.remove();const n=localStorage.getItem("searchQuery");if(n){const r=await L(n);b(r.data)}else await b()}catch(s){const a=s.message||"Something went wrong while deleting the post.";i(a,"error")}}async function T(t,{title:e,body:o,media:s}){const a=`${g}/${t}`,n=await fetch(a,{method:"PUT",headers:u(),body:JSON.stringify({title:e,body:o,media:s})});if(!n.ok){const r=await n.json();throw new Error(r.errors?.[0]?.message||"Failed to update post")}return await n.json()}function F(t){const e=t.currentTarget.dataset.id,o=t.target.closest(".post-box"),s=o.querySelector(".post-title")?.innerText,a=o.querySelector(".post-body")?.innerText,n=o.querySelector(".post-image"),r=n?.src||"",l=n?.alt||"",f=`
      <div class="modal fade" id="edit-post-modal" tabindex="-1">
        <div class="modal-dialog">
          <form name="editPostForm" id="edit-post-form" class="modal-content" data-id="${e}">
            <div class="modal-header">
              <h2 class="modal-title">Edit Post</h2>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input id="edit-title" type="text" name="title" class="form-control mb-3 rounded-3 create-form-field" value="${s}" />
              <textarea id="edit-body" name="body" class="form-control mb-3 rounded-3 create-form-field" rows="10">${a}</textarea>
              <input id="edit-media-url" type="text" name="mediaUrl" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image URL (optional)" />
              <input id="edit-media-alt" type="text" name="mediaAlt" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image alt text (optional)" />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn submit-btn">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",f);const d=document.getElementById("edit-post-modal");if(d){const m=document.getElementById("edit-media-url"),p=document.getElementById("edit-media-alt");m&&(m.value=r),p&&(p.value=l);const c=document.getElementById("edit-post-form");c&&c.addEventListener("submit",C),new bootstrap.Modal(d).show()}}async function C(t){t.preventDefault();const o=t.target.dataset.id,s=document.getElementById("edit-title").value.trim(),a=document.getElementById("edit-body").value.trim(),n=document.getElementById("edit-media-url").value.trim(),r=document.getElementById("edit-media-alt").value.trim(),l=[];if((!s||!a)&&l.push("Title and body are required."),n&&r)try{new URL(n)}catch{l.push("Image URL must be a valid URL.")}else(n||r)&&l.push("Both image URL and alt text are required if one is provided.");if(l.length){i(l.join(" "),"error");return}const f={title:s,body:a,media:n?{url:n,alt:r}:void 0};try{await T(o,f),i("Post updated successfully!","success");const d=document.querySelector(`.edit-post-btn[data-id="${o}"]`)?.closest(".post-box");if(d){d.querySelector(".post-title").innerText=s,d.querySelector(".post-body").innerText=a;const c=d.querySelector(".post-image");if(n)if(c)c.src=n,c.alt=r||"Post image";else{const h=document.createElement("img");h.src=n,h.alt=r||"Post image",h.className="post-image img-fluid mt-2",d.appendChild(h)}else c&&c.remove()}const m=document.getElementById("edit-post-modal"),p=bootstrap.Modal.getInstance(m);p&&p.hide(),m.remove()}catch(d){const m=d.message||"Something went wrong while updating the post.";i(m,"error")}}async function A(t){const e=`${x}/${t}/follow`,o=await fetch(e,{method:"PUT",headers:u()}),s=await o.json();if(!o.ok)throw new Error(s.errors?.[0]?.message||"Failed to follow user");return s}async function k(t){const e=`${x}/${t}/unfollow`,o=await fetch(e,{method:"PUT",headers:u()}),s=await o.json();if(!o.ok)throw new Error(s.errors?.[0]?.message||"Failed to unfollow user");return s}function q(t){if(t===w())return null;const e=document.createElement("button");return e.className="follow-btn text-primary",e.textContent=j(t)?"Unfollow":"Follow",e.dataset.username=t,e.addEventListener("click",async()=>{try{e.textContent==="Follow"?(await A(t),e.textContent="Unfollow",E(t,"add"),I(t,!0)):(await k(t),e.textContent="Follow",E(t,"remove"),I(t,!1))}catch(o){console.error("Failed to follow/unfollow",o)}}),e}function j(t){return(JSON.parse(localStorage.getItem("followingList"))||[]).includes(t)}function E(t,e){let o=JSON.parse(localStorage.getItem("followingList"))||[];e==="add"&&!o.includes(t)?o.push(t):e==="remove"&&(o=o.filter(s=>s!==t)),localStorage.setItem("followingList",JSON.stringify(o))}function I(t,e){document.querySelectorAll(`.follow-btn[data-username="${t}"]`).forEach(s=>{s.textContent=e?"Unfollow":"Follow"})}async function b(t=null){try{const e=document.getElementById("feed-post-container");if(!e)return;e.innerHTML="";const o=t||await y(),s=w();for(const a of o){const n=document.createElement("div");n.id="feed-boxes",n.className="post-box shadow rounded-3 p-3 mb-3",n.innerHTML=`
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center">
            <img src="${a.author?.avatar?.url??"/public/images/avatar.png"}" alt="${a.author?.avatar?.alt||"User avatar"}" class="rounded-circle me-2 user-avatar">
            <div>
              <strong class="h5 mb-0">
                <a href="/profile/authorPosts/?username=${a.author?.name}" class="text-decoration-none text-white">
                  ${a.author?.name||"Unknown Author"}
                </a>
              </strong>
            <!-- Conditionally show Follow/Unfollow button -->
            ${a.author?.name!==s?'<div class="follow-btn-container"></div>':""}
            </div>
          </div>

          ${a.author?.name===s?`<div>
                   <button class="btn btn-sm me-2 edit-post-btn rounded-2" data-id="${a.id}"><i class="fa-solid fa-pen"></i></button>
                   <button class="btn btn-sm btn-outline-danger delete-post-btn rounded-2" data-id="${a.id}" data-title="${a.title}"><i class="fa-solid fa-trash-can"></i></button>
                 </div>`:""}
        </div>

        <a href="post/index.html?id=${a.id}" class="text-decoration-none text-reset">
          <div class="mb-3">
            <p class="post-title fw-bold h4">${a.title}</p>
            <p class="post-body">${a.body||""}</p>
            ${a.media?.url?`<img src="${a.media.url}" alt="${a.media.alt||"Post image"}" class="post-image img-fluid mt-2" />`:""}
          </div>
          <span class="posted-on">Posted on <strong>${new Date(a.created).toLocaleDateString()}</strong></span>
        </a>
      `;const r=q(a.author?.name),l=n.querySelector(".follow-btn-container");r&&l&&l.appendChild(r),e.appendChild(n)}document.querySelectorAll(".edit-post-btn").forEach(a=>a.addEventListener("click",F)),document.querySelectorAll(".delete-post-btn").forEach(a=>a.addEventListener("click",S))}catch(e){console.error("Failed to load posts:",e)}}async function D(){const t=localStorage.getItem("searchQuery"),e=document.getElementById("search-feedback"),o=document.getElementById("create-post-container");try{let s;t?(s=(await L(t)).data,e&&(e.textContent=s.length===0?"No posts found. Try searching for words in the title or body.":`Showing results for "${t}"`),o&&o.classList.add("d-none")):s=await y(),b(s),v();const a=document.getElementById("clear-search-btn");a&&(a.classList.toggle("d-none",!t),a.onclick=async()=>{e&&(e.textContent=""),a.classList.add("d-none");const n=await y();b(n),v(),o&&o.classList.remove("d-none");const r=document.getElementById("search-input"),l=document.getElementById("search-input-mobile");r&&(r.value=""),l&&(l.value="")})}catch(s){console.error("Failed to load feed:",s),i("Failed to load posts.","error")}}async function M({title:t,body:e,media:o}){if(!localStorage.getItem("accessToken"))throw new Error("You must be logged in to create a post.");const a={title:t,body:e};o&&o.url&&(a.media=o);try{const n=u(),r=await fetch(g,{method:"POST",headers:n,body:JSON.stringify(a)});if(!r.ok)throw new Error(`Error: ${r.statusText}`);return(await r.json()).data}catch(n){throw console.error("Error creating post:",n),new Error(`Failed to create post: ${n.message}`)}}async function R(){if(!P())return;const t=document.getElementById("create-post-container");if(!t)return;const e=w();if(!e)return;const o=await $(e);t.innerHTML=`
    <div id="feed-boxes" class="rounded-3 mt-4 mb-3">
      <div class="d-flex align-items-center mb-3">
        <img src="${o.avatar?.url||"/public/images/avatar.png"}" alt="${o.avatar?.alt||"User avatar"}" class="rounded-circle me-2 user-avatar">
        <strong class="h5 mb-0">${o.name}</strong>
      </div>
      <div>
        <input type="text" class="form-control rounded-3 create-form-field" placeholder="What's on your mind?" data-bs-toggle="modal" data-bs-target="#create-post-modal" readonly />
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="create-post-modal" tabindex="-1" aria-labelledby="create-post-modal-label">
      <div class="modal-dialog">
        <form id="create-post-form" class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="create-post-modal-label">Create Post</h2>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" name="title" class="form-control mb-3 rounded-3 create-form-field" placeholder="Title" />
            <textarea name="body" class="form-control mb-3 rounded-3 create-form-field" placeholder="Write your post..." rows="10"></textarea>
            <input type="text" name="mediaUrl" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image URL (optional)" />
            <input type="text" name="mediaAlt" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image alt text (optional)" />
          </div>
          <div class="modal-footer">
            <button type="submit" class="submit-btn">Post</button>
          </div>
        </form>
      </div>
    </div>
  `;const s=document.getElementById("create-post-form");s&&s.addEventListener("submit",O)}async function O(t){t.preventDefault();const e=t.target,o=e.title.value.trim(),s=e.body.value.trim(),a=e.mediaUrl.value.trim(),n=e.mediaAlt.value.trim(),r=[];if((!o||o.length<3)&&r.push("Title must be at least 3 characters long."),(!s||s.length<3)&&r.push("Post text must be at least 3 characters long."),a&&n)try{new URL(a)}catch{r.push("Image URL must be a valid URL.")}else(a||n)&&r.push("Both image URL and alt text are required if one is provided.");if(r.length>0){i(r.join(" "),"error");return}const l={title:o,body:s};a&&n&&(l.media={url:a,alt:n});try{await M(l),i("Post created successfully!","success"),e.reset(),bootstrap.Modal.getInstance(document.getElementById("create-post-modal")).hide(),await b()}catch(f){i(f.message,"error")}}console.log("✅ feed.js loaded");try{R(),D()}catch(t){console.error("❌ Error in feed.js:",t)}
