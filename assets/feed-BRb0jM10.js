import{A as g,h as u,a as x}from"./headers-C2fTOECc.js";import{s as i,g as w,a as v,i as P}from"./app-Dy7bQc8A.js";import{r as $}from"./read-DmHqR6i0.js";async function y(){const e=new URL(g);e.searchParams.append("_author","true");const t=await fetch(e,{headers:u()});if(!t.ok){const s=await t.json();throw new Error(s.message||"Failed to load posts")}const{data:o}=await t.json();return o}async function L(e){const t=new URL(`${g}/search`);t.searchParams.append("q",e),t.searchParams.append("_author","true");const o=await fetch(t,{headers:u()});if(!o.ok){const s=await o.json();throw new Error(s.errors?.[0]?.message||"Failed to search posts")}return await o.json()}async function B(e){const t=`${g}/${e}`,o=await fetch(t,{method:"DELETE",headers:u()});if(!o.ok){const s=await o.json();throw new Error(s.errors?.[0]?.message||"Failed to delete post")}return!0}function S(e){const o=e.currentTarget.dataset.id,n=`
      <div class="modal fade" id="delete-post-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content rounded-3">
            <div class="modal-header">
              <h3 class="modal-title">Confirm Deletion</h3>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete your post <strong>${e.target.closest(".post-box").querySelector(".post-title")?.innerText||"this post"}</strong>?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-light rounded-2" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger rounded-2" id="confirm-delete-btn" data-id="${o}">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",n);const r=document.getElementById("delete-post-modal");if(r){const l=document.getElementById("confirm-delete-btn");l&&l.addEventListener("click",U),new bootstrap.Modal(r).show()}}async function U(e){const o=e.currentTarget.dataset.id;try{await B(o),i("Post deleted successfully!","success");const s=document.getElementById("delete-post-modal"),a=bootstrap.Modal.getInstance(s);a&&a.hide(),s.remove();const n=localStorage.getItem("searchQuery");if(n){const r=await L(n);b(r.data)}else await b()}catch(s){const a=s.message||"Something went wrong while deleting the post.";i(a,"error")}}async function T(e,{title:t,body:o,media:s}){const a=`${g}/${e}`,n=await fetch(a,{method:"PUT",headers:u(),body:JSON.stringify({title:t,body:o,media:s})});if(!n.ok){const r=await n.json();throw new Error(r.errors?.[0]?.message||"Failed to update post")}return await n.json()}function F(e){const t=e.currentTarget.dataset.id,o=e.target.closest(".post-box"),s=o.querySelector(".post-title")?.innerText,a=o.querySelector(".post-body")?.innerText,n=o.querySelector(".post-image"),r=n?.src||"",l=n?.alt||"",f=`
      <div class="modal fade" id="edit-post-modal" tabindex="-1">
        <div class="modal-dialog">
          <form name="editPostForm" id="edit-post-form" class="modal-content" data-id="${t}">
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
    `;document.body.insertAdjacentHTML("beforeend",f);const d=document.getElementById("edit-post-modal");if(d){const m=document.getElementById("edit-media-url"),p=document.getElementById("edit-media-alt");m&&(m.value=r),p&&(p.value=l);const c=document.getElementById("edit-post-form");c&&c.addEventListener("submit",C),new bootstrap.Modal(d).show()}}async function C(e){e.preventDefault();const o=e.target.dataset.id,s=document.getElementById("edit-title").value.trim(),a=document.getElementById("edit-body").value.trim(),n=document.getElementById("edit-media-url").value.trim(),r=document.getElementById("edit-media-alt").value.trim(),l=[];if((!s||!a)&&l.push("Title and body are required."),n&&r)try{new URL(n)}catch{l.push("Image URL must be a valid URL.")}else(n||r)&&l.push("Both image URL and alt text are required if one is provided.");if(l.length){i(l.join(" "),"error");return}const f={title:s,body:a,media:n?{url:n,alt:r}:void 0};try{await T(o,f),i("Post updated successfully!","success");const d=document.querySelector(`.edit-post-btn[data-id="${o}"]`)?.closest(".post-box");if(d){d.querySelector(".post-title").innerText=s,d.querySelector(".post-body").innerText=a;const c=d.querySelector(".post-image");if(n)if(c)c.src=n,c.alt=r||"Post image";else{const h=document.createElement("img");h.src=n,h.alt=r||"Post image",h.className="post-image img-fluid mt-2",d.appendChild(h)}else c&&c.remove()}const m=document.getElementById("edit-post-modal"),p=bootstrap.Modal.getInstance(m);p&&p.hide(),m.remove()}catch(d){const m=d.message||"Something went wrong while updating the post.";i(m,"error")}}async function A(e){const t=`${x}/${e}/follow`,o=await fetch(t,{method:"PUT",headers:u()}),s=await o.json();if(!o.ok)throw new Error(s.errors?.[0]?.message||"Failed to follow user");return s}async function k(e){const t=`${x}/${e}/unfollow`,o=await fetch(t,{method:"PUT",headers:u()}),s=await o.json();if(!o.ok)throw new Error(s.errors?.[0]?.message||"Failed to unfollow user");return s}function q(e){if(e===w())return null;const t=document.createElement("button");return t.className="follow-btn text-primary",t.textContent=D(e)?"Unfollow":"Follow",t.dataset.username=e,t.addEventListener("click",async()=>{try{t.textContent==="Follow"?(await A(e),t.textContent="Unfollow",E(e,"add"),I(e,!0)):(await k(e),t.textContent="Follow",E(e,"remove"),I(e,!1))}catch(o){console.error("Failed to follow/unfollow",o)}}),t}function D(e){return(JSON.parse(localStorage.getItem("followingList"))||[]).includes(e)}function E(e,t){let o=JSON.parse(localStorage.getItem("followingList"))||[];t==="add"&&!o.includes(e)?o.push(e):t==="remove"&&(o=o.filter(s=>s!==e)),localStorage.setItem("followingList",JSON.stringify(o))}function I(e,t){document.querySelectorAll(`.follow-btn[data-username="${e}"]`).forEach(s=>{s.textContent=t?"Unfollow":"Follow"})}async function b(e=null){try{const t=document.getElementById("feed-post-container");if(!t)return;t.innerHTML="";const o=e||await y(),s=w();for(const a of o){const n=document.createElement("div");n.id="feed-boxes",n.className="post-box shadow rounded-3 p-3 mb-3",n.innerHTML=`
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
      `;const r=q(a.author?.name),l=n.querySelector(".follow-btn-container");r&&l&&l.appendChild(r),t.appendChild(n)}document.querySelectorAll(".edit-post-btn").forEach(a=>a.addEventListener("click",F)),document.querySelectorAll(".delete-post-btn").forEach(a=>a.addEventListener("click",S))}catch(t){console.error("Failed to load posts:",t)}}async function j(){const e=localStorage.getItem("searchQuery"),t=document.getElementById("search-feedback"),o=document.getElementById("create-post-container");try{let s;e?(s=(await L(e)).data,t&&(t.textContent=s.length===0?"No posts found. Try searching for words in the title or body.":`Showing results for "${e}"`),o&&o.classList.add("d-none")):s=await y(),b(s),v();const a=document.getElementById("clear-search-btn");a&&(a.classList.toggle("d-none",!e),a.onclick=async()=>{t&&(t.textContent=""),a.classList.add("d-none");const n=await y();b(n),v(),o&&o.classList.remove("d-none");const r=document.getElementById("search-input"),l=document.getElementById("search-input-mobile");r&&(r.value=""),l&&(l.value="")})}catch(s){console.error("Failed to load feed:",s),i("Failed to load posts.","error")}}async function M({title:e,body:t,media:o}){if(!localStorage.getItem("accessToken"))throw new Error("You must be logged in to create a post.");const a={title:e,body:t};o&&o.url&&(a.media=o);try{const n=u(),r=await fetch(g,{method:"POST",headers:n,body:JSON.stringify(a)});if(!r.ok)throw new Error(`Error: ${r.statusText}`);return(await r.json()).data}catch(n){throw console.error("Error creating post:",n),new Error(`Failed to create post: ${n.message}`)}}async function R(){if(!P())return;const e=document.getElementById("create-post-container");if(!e)return;const t=w();if(!t)return;const o=await $(t);e.innerHTML=`
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
  `;const s=document.getElementById("create-post-form");s&&s.addEventListener("submit",O)}async function O(e){e.preventDefault();const t=e.target,o=t.title.value.trim(),s=t.body.value.trim(),a=t.mediaUrl.value.trim(),n=t.mediaAlt.value.trim(),r=[];if((!o||o.length<3)&&r.push("Title must be at least 3 characters long."),(!s||s.length<3)&&r.push("Post text must be at least 3 characters long."),a&&n)try{new URL(a)}catch{r.push("Image URL must be a valid URL.")}else(a||n)&&r.push("Both image URL and alt text are required if one is provided.");if(r.length>0){i(r.join(" "),"error");return}const l={title:o,body:s};a&&n&&(l.media={url:a,alt:n});try{await M(l),i("Post created successfully!","success"),t.reset(),bootstrap.Modal.getInstance(document.getElementById("create-post-modal")).hide(),await b()}catch(f){i(f.message,"error")}}R();j();
