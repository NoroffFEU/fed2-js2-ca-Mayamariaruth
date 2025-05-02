import{A as h,h as m,a as v}from"./authorPosts-BrDXv11R.js";function y(){return!!localStorage.getItem("accessToken")}function E(){return JSON.parse(localStorage.getItem("profile"))?.name||null}function H(){const e=document.querySelectorAll(".nav-link"),t=window.location.pathname.replace(/\/+$/,"");e.forEach(a=>{new URL(a.href).pathname.replace(/\/+$/,"")===t&&a.getAttribute("href")!=="#"?a.classList.add("active"):a.classList.remove("active")});const o=document.querySelector("#profile-dropdown");o&&(t==="/fed2-js2-ca-Mayamariaruth/auth/login"||t==="/fed2-js2-ca-Mayamariaruth/auth/register"||t.startsWith("/fed2-js2-ca-Mayamariaruth/profile")?o.classList.add("active"):o.classList.remove("active"))}function N(){const e=y(),t={login:document.getElementById("login-link"),register:document.getElementById("register-link"),profile:document.getElementById("profile-link"),logout:document.getElementById("logout-link")},o={login:document.getElementById("login-wrapper-mobile"),register:document.getElementById("register-wrapper-mobile"),profile:document.getElementById("profile-wrapper-mobile"),logout:document.getElementById("logout-wrapper-mobile")};[t,o].forEach(a=>{a.login&&(a.login.style.display=e?"none":"block"),a.register&&(a.register.style.display=e?"none":"block"),a.profile&&(a.profile.style.display=e?"block":"none"),a.logout&&(a.logout.style.display=e?"block":"none")})}function I(){const e=document.querySelector("#nav-home-desktop"),t=document.querySelector("#nav-home-mobile");document.querySelectorAll(".nav-link").forEach(o=>{o.classList.remove("active")}),e&&e.classList.add("active"),t&&t.classList.add("active")}function d(e,t="success"){const o=document.getElementById("notifications");if(!o)return;const a=t==="success"?"alert-success":"alert-danger",s=document.createElement("div");s.className=`alert ${a} alert-dismissible fade show`,s.role="alert",s.textContent=e,o.appendChild(s),setTimeout(()=>{s&&s.parentNode&&(s.classList.remove("show"),s.classList.add("fade"),setTimeout(()=>s.remove(),150))},5e3)}async function w(){const e=new URL(h);y()&&e.searchParams.append("_author","true");const t=await fetch(e,{headers:m()});if(!t.ok){const a=await t.json();throw new Error(a.message||"Failed to load posts")}const{data:o}=await t.json();return o}async function P(e){const t=new URL(`${h}/search`);t.searchParams.append("q",e),t.searchParams.append("_author","true");const o=await fetch(t,{headers:m()});if(!o.ok){const a=await o.json();throw new Error(a.errors?.[0]?.message||"Failed to search posts")}return await o.json()}async function S(e){const t=`${h}/${e}`,o=await fetch(t,{method:"DELETE",headers:m()});if(!o.ok){const a=await o.json();throw new Error(a.errors?.[0]?.message||"Failed to delete post")}return!0}function B(e){const o=e.currentTarget.dataset.id,n=`
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
    `;document.body.insertAdjacentHTML("beforeend",n);const r=document.getElementById("delete-post-modal");if(r){const l=document.getElementById("confirm-delete-btn");l&&l.addEventListener("click",$),new bootstrap.Modal(r).show()}}async function $(e){const o=e.currentTarget.dataset.id;try{await S(o),d("Post deleted successfully!","success");const a=document.getElementById("delete-post-modal"),s=bootstrap.Modal.getInstance(a);s&&s.hide(),a.remove();const n=localStorage.getItem("searchQuery");if(n){const r=await P(n);g(r.data)}else await g()}catch(a){const s=a.message||"Something went wrong while deleting the post.";d(s,"error")}}async function k(e,{title:t,body:o,media:a}){const s=`${h}/${e}`,n=await fetch(s,{method:"PUT",headers:m(),body:JSON.stringify({title:t,body:o,media:a})});if(!n.ok){const r=await n.json();throw new Error(r.errors?.[0]?.message||"Failed to update post")}return await n.json()}function U(e){const t=e.currentTarget.dataset.id,o=e.target.closest(".post-box"),a=o.querySelector(".post-title")?.innerText,s=o.querySelector(".post-body")?.innerText,n=o.querySelector(".post-image"),r=n?.src||"",l=n?.alt||"",f=`
      <div class="modal fade" id="edit-post-modal" tabindex="-1">
        <div class="modal-dialog">
          <form name="editPostForm" id="edit-post-form" class="modal-content" data-id="${t}">
            <div class="modal-header">
              <h2 class="modal-title">Edit Post</h2>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input id="edit-title" type="text" name="title" class="form-control mb-3 rounded-3 create-form-field" value="${a}" />
              <textarea id="edit-body" name="body" class="form-control mb-3 rounded-3 create-form-field" rows="10">${s}</textarea>
              <input id="edit-media-url" type="text" name="mediaUrl" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image URL (optional)" />
              <input id="edit-media-alt" type="text" name="mediaAlt" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image alt text (optional)" />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn submit-btn">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",f);const i=document.getElementById("edit-post-modal");if(i){const u=document.getElementById("edit-media-url"),p=document.getElementById("edit-media-alt");u&&(u.value=r),p&&(p.value=l);const c=document.getElementById("edit-post-form");c&&c.addEventListener("submit",T),new bootstrap.Modal(i).show()}}async function T(e){e.preventDefault();const o=e.target.dataset.id,a=document.getElementById("edit-title").value.trim(),s=document.getElementById("edit-body").value.trim(),n=document.getElementById("edit-media-url").value.trim(),r=document.getElementById("edit-media-alt").value.trim(),l=[];if((!a||!s)&&l.push("Title and body are required."),n&&r)try{new URL(n)}catch{l.push("Image URL must be a valid URL.")}else(n||r)&&l.push("Both image URL and alt text are required if one is provided.");if(l.length){d(l.join(" "),"error");return}const f={title:a,body:s,media:n?{url:n,alt:r}:void 0};try{await k(o,f),d("Post updated successfully!","success");const i=document.querySelector(`.edit-post-btn[data-id="${o}"]`)?.closest(".post-box");if(i){i.querySelector(".post-title").innerText=a,i.querySelector(".post-body").innerText=s;const c=i.querySelector(".post-image");if(n)if(c)c.src=n,c.alt=r||"Post image";else{const b=document.createElement("img");b.src=n,b.alt=r||"Post image",b.className="post-image img-fluid mt-2",i.appendChild(b)}else c&&c.remove()}const u=document.getElementById("edit-post-modal"),p=bootstrap.Modal.getInstance(u);p&&p.hide(),u.remove()}catch(i){const u=i.message||"Something went wrong while updating the post.";d(u,"error")}}async function C(e){const t=`${v}/${e}/follow`,o=await fetch(t,{method:"PUT",headers:m()}),a=await o.json();if(!o.ok)throw new Error(a.errors?.[0]?.message||"Failed to follow user");return a}async function F(e){const t=`${v}/${e}/unfollow`,o=await fetch(t,{method:"PUT",headers:m()}),a=await o.json();if(!o.ok)throw new Error(a.errors?.[0]?.message||"Failed to unfollow user");return a}function A(e){if(e===E())return null;const t=document.createElement("button");return t.className="follow-btn text-primary",t.textContent=q(e)?"Unfollow":"Follow",t.dataset.username=e,t.addEventListener("click",async()=>{try{t.textContent==="Follow"?(await C(e),t.textContent="Unfollow",x(e,"add"),L(e,!0)):(await F(e),t.textContent="Follow",x(e,"remove"),L(e,!1))}catch(o){console.error("Failed to follow/unfollow",o)}}),t}function q(e){return(JSON.parse(localStorage.getItem("followingList"))||[]).includes(e)}function x(e,t){let o=JSON.parse(localStorage.getItem("followingList"))||[];t==="add"&&!o.includes(e)?o.push(e):t==="remove"&&(o=o.filter(a=>a!==e)),localStorage.setItem("followingList",JSON.stringify(o))}function L(e,t){document.querySelectorAll(`.follow-btn[data-username="${e}"]`).forEach(a=>{a.textContent=t?"Unfollow":"Follow"})}async function g(e=null){try{const t=document.getElementById("feed-post-container");if(!t)return;t.innerHTML="";const o=e||await w(),a=E();for(const s of o){const n=document.createElement("div");n.id="feed-boxes",n.className="post-box shadow rounded-3 p-3 mb-3",n.innerHTML=`
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center">
            <img src="${s.author?.avatar?.url??"/public/images/avatar.png"}" alt="${s.author?.avatar?.alt||"User avatar"}" class="rounded-circle me-2 user-avatar">
            <div>
              <strong class="h5 mb-0">
                <a href="/profile/authorPosts/?username=${s.author?.name}" class="text-decoration-none text-white">
                  ${s.author?.name||"Unknown Author"}
                </a>
              </strong>
            <!-- Conditionally show Follow/Unfollow button -->
            ${s.author?.name!==a?'<div class="follow-btn-container"></div>':""}
            </div>
          </div>

          ${s.author?.name===a?`<div>
                   <button class="btn btn-sm me-2 edit-post-btn rounded-2" data-id="${s.id}"><i class="fa-solid fa-pen"></i></button>
                   <button class="btn btn-sm btn-outline-danger delete-post-btn rounded-2" data-id="${s.id}" data-title="${s.title}"><i class="fa-solid fa-trash-can"></i></button>
                 </div>`:""}
        </div>

        <a href="post/index.html?id=${s.id}" class="text-decoration-none text-reset">
          <div class="mb-3">
            <p class="post-title fw-bold h4">${s.title}</p>
            <p class="post-body">${s.body||""}</p>
            ${s.media?.url?`<img src="${s.media.url}" alt="${s.media.alt||"Post image"}" class="post-image img-fluid mt-2" />`:""}
          </div>
          <span class="posted-on">Posted on <strong>${new Date(s.created).toLocaleDateString()}</strong></span>
        </a>
      `;const r=A(s.author?.name),l=n.querySelector(".follow-btn-container");r&&l&&l.appendChild(r),t.appendChild(n)}document.querySelectorAll(".edit-post-btn").forEach(s=>s.addEventListener("click",U)),document.querySelectorAll(".delete-post-btn").forEach(s=>s.addEventListener("click",B))}catch(t){console.error("Failed to load posts:",t)}}async function j(){const e=localStorage.getItem("searchQuery"),t=document.getElementById("search-feedback"),o=document.getElementById("create-post-container");try{if(!y()&&!e){t&&(t.textContent="Please log in to view posts.");return}let a;e?(a=(await P(e)).data,t&&(t.textContent=a.length===0?"No posts found. Try searching for words in the title or body.":`Showing results for "${e}"`),o&&o.classList.add("d-none")):a=await w(),g(a),I();const s=document.getElementById("clear-search-btn");s&&(s.classList.toggle("d-none",!e),s.onclick=async()=>{t&&(t.textContent=""),s.classList.add("d-none");const n=await w();g(n),I(),o&&o.classList.remove("d-none");const r=document.getElementById("search-input"),l=document.getElementById("search-input-mobile");r&&(r.value=""),l&&(l.value="")})}catch(a){console.error("Failed to load feed:",a),d("Failed to load posts.","error")}}async function D({title:e,body:t,media:o}){if(!localStorage.getItem("accessToken"))throw new Error("You must be logged in to create a post.");const s={title:e,body:t};o&&o.url&&(s.media=o);try{const n=m(),r=await fetch(h,{method:"POST",headers:n,body:JSON.stringify(s)});if(!r.ok)throw new Error(`Error: ${r.statusText}`);return(await r.json()).data}catch(n){throw console.error("Error creating post:",n),new Error(`Failed to create post: ${n.message}`)}}async function M(e){const t=await fetch(`${v}/${e}`,{headers:m()});if(!t.ok){const a=await t.json();throw new Error(a.message||"Failed to load profile")}const{data:o}=await t.json();return o}async function O(){if(!y())return;const e=document.getElementById("create-post-container");if(!e)return;const t=E();if(!t)return;const o=await M(t);e.innerHTML=`
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
  `;const a=document.getElementById("create-post-form");a&&a.addEventListener("submit",R)}async function R(e){e.preventDefault();const t=e.target,o=t.title.value.trim(),a=t.body.value.trim(),s=t.mediaUrl.value.trim(),n=t.mediaAlt.value.trim(),r=[];if((!o||o.length<3)&&r.push("Title must be at least 3 characters long."),(!a||a.length<3)&&r.push("Post text must be at least 3 characters long."),s&&n)try{new URL(s)}catch{r.push("Image URL must be a valid URL.")}else(s||n)&&r.push("Both image URL and alt text are required if one is provided.");if(r.length>0){d(r.join(" "),"error");return}const l={title:o,body:a};s&&n&&(l.media={url:s,alt:n});try{await D(l),d("Post created successfully!","success"),t.reset(),bootstrap.Modal.getInstance(document.getElementById("create-post-modal")).hide(),await g()}catch(f){d(f.message,"error")}}O();j();const J=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{H as a,J as f,E as g,y as i,M as r,d as s,N as u};
