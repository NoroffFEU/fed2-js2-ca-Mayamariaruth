import{A as h,h as m,a as v}from"./authorPosts-a1AKxWD9.js";function y(){return!!localStorage.getItem("accessToken")}function E(){return JSON.parse(localStorage.getItem("profile"))?.name||null}function J(){const e=document.querySelectorAll(".nav-link"),t=window.location.pathname.replace(/\/+$/,"");e.forEach(a=>{new URL(a.href).pathname.replace(/\/+$/,"")===t&&a.getAttribute("href")!=="#"?a.classList.add("active"):a.classList.remove("active")});const o=document.querySelector("#profile-dropdown");o&&(t==="/fed2-js2-ca-Mayamariaruth/auth/login"||t==="/fed2-js2-ca-Mayamariaruth/auth/register"||t.startsWith("/fed2-js2-ca-Mayamariaruth/profile")?o.classList.add("active"):o.classList.remove("active"))}function W(){const e=y(),t={login:document.getElementById("login-link"),register:document.getElementById("register-link"),profile:document.getElementById("profile-link"),logout:document.getElementById("logout-link")},o={login:document.getElementById("login-wrapper-mobile"),register:document.getElementById("register-wrapper-mobile"),profile:document.getElementById("profile-wrapper-mobile"),logout:document.getElementById("logout-wrapper-mobile")};[t,o].forEach(a=>{a.login&&(a.login.style.display=e?"none":"block"),a.register&&(a.register.style.display=e?"none":"block"),a.profile&&(a.profile.style.display=e?"block":"none"),a.logout&&(a.logout.style.display=e?"block":"none")})}function L(){const e=document.querySelector("#nav-home-desktop"),t=document.querySelector("#nav-home-mobile");window.location.pathname.replace(/\/+$/,"")==="/fed2-js2-ca-Mayamariaruth/index.html"&&(e&&e.classList.add("active"),t&&t.classList.add("active"))}function d(e,t="success"){const o=document.getElementById("notifications");if(!o)return;const a=t==="success"?"alert-success":"alert-danger",n=document.createElement("div");n.className=`alert ${a} alert-dismissible fade show`,n.role="alert",n.textContent=e,o.appendChild(n),setTimeout(()=>{n&&n.parentNode&&(n.classList.remove("show"),n.classList.add("fade"),setTimeout(()=>n.remove(),150))},5e3)}async function w(){const e=new URL(h);y()&&e.searchParams.append("_author","true");const t=await fetch(e,{headers:m()});if(!t.ok){const a=await t.json();throw new Error(a.message||"Failed to load posts")}const{data:o}=await t.json();return o}async function S(e){const t=new URL(`${h}/search`);t.searchParams.append("q",e),t.searchParams.append("_author","true");const o=await fetch(t,{headers:m()});if(!o.ok){const a=await o.json();throw new Error(a.errors?.[0]?.message||"Failed to search posts")}return await o.json()}async function $(e){const t=`${h}/${e}`,o=await fetch(t,{method:"DELETE",headers:m()});if(!o.ok){const a=await o.json();throw new Error(a.errors?.[0]?.message||"Failed to delete post")}return!0}function I(){if(document.getElementById("loading-spinner"))return;const e=document.createElement("div");e.id="loading-spinner";const t=document.createElement("div");t.classList.add("spinner-border","text-success-emphasis"),t.setAttribute("role","status"),e.appendChild(t),document.body.appendChild(e)}function x(){const e=document.getElementById("loading-spinner");e&&e.remove()}function k(e){const o=e.currentTarget.dataset.id,s=`
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
    `;document.body.insertAdjacentHTML("beforeend",s);const r=document.getElementById("delete-post-modal");if(r){const l=document.getElementById("confirm-delete-btn");l&&l.addEventListener("click",U),new bootstrap.Modal(r).show()}}async function U(e){const o=e.currentTarget.dataset.id;I();try{await $(o),d("Post deleted successfully!","success");const a=document.getElementById("delete-post-modal"),n=bootstrap.Modal.getInstance(a);n&&n.hide(),a.remove();const s=localStorage.getItem("searchQuery");if(s){const r=await S(s);g(r.data)}else await g()}catch(a){const n=a.message||"Something went wrong while deleting the post.";d(n,"error")}finally{x()}}async function T(e,{title:t,body:o,media:a}){const n=`${h}/${e}`,s=await fetch(n,{method:"PUT",headers:m(),body:JSON.stringify({title:t,body:o,media:a})});if(!s.ok){const r=await s.json();throw new Error(r.errors?.[0]?.message||"Failed to update post")}return await s.json()}function C(e){const t=e.currentTarget.dataset.id,o=e.target.closest(".post-box"),a=o.querySelector(".post-title")?.innerText,n=o.querySelector(".post-body")?.innerText,s=o.querySelector(".post-image"),r=s?.src||"",l=s?.alt||"",f=`
      <div class="modal fade" id="edit-post-modal" tabindex="-1">
        <div class="modal-dialog">
          <form name="editPostForm" id="edit-post-form" class="modal-content" data-id="${t}">
            <div class="modal-header">
              <h2 class="modal-title">Edit Post</h2>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input id="edit-title" type="text" name="title" class="form-control mb-3 rounded-3 create-form-field" value="${a}" />
              <textarea id="edit-body" name="body" class="form-control mb-3 rounded-3 create-form-field" rows="10">${n}</textarea>
              <input id="edit-media-url" type="text" name="mediaUrl" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image URL (optional)" />
              <input id="edit-media-alt" type="text" name="mediaAlt" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image alt text (optional)" />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn submit-btn">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",f);const i=document.getElementById("edit-post-modal");if(i){const u=document.getElementById("edit-media-url"),p=document.getElementById("edit-media-alt");u&&(u.value=r),p&&(p.value=l);const c=document.getElementById("edit-post-form");c&&c.addEventListener("submit",F),new bootstrap.Modal(i).show()}}async function F(e){e.preventDefault();const o=e.target.dataset.id,a=document.getElementById("edit-title").value.trim(),n=document.getElementById("edit-body").value.trim(),s=document.getElementById("edit-media-url").value.trim(),r=document.getElementById("edit-media-alt").value.trim(),l=[];if((!a||!n)&&l.push("Title and body are required."),s&&r)try{new URL(s)}catch{l.push("Image URL must be a valid URL.")}else(s||r)&&l.push("Both image URL and alt text are required if one is provided.");if(l.length){d(l.join(" "),"error");return}const f={title:a,body:n,media:s?{url:s,alt:r}:void 0};I();try{await T(o,f),d("Post updated successfully!","success");const i=document.querySelector(`.edit-post-btn[data-id="${o}"]`)?.closest(".post-box");if(i){i.querySelector(".post-title").innerText=a,i.querySelector(".post-body").innerText=n;const c=i.querySelector(".post-image");if(s)if(c)c.src=s,c.alt=r||"Post image";else{const b=document.createElement("img");b.src=s,b.alt=r||"Post image",b.className="post-image img-fluid mt-2",i.appendChild(b)}else c&&c.remove()}const u=document.getElementById("edit-post-modal"),p=bootstrap.Modal.getInstance(u);p&&p.hide(),u.remove()}catch(i){const u=i.message||"Something went wrong while updating the post.";d(u,"error")}finally{x()}}async function A(e){const t=`${v}/${e}/follow`,o=await fetch(t,{method:"PUT",headers:m()}),a=await o.json();if(!o.ok)throw new Error(a.errors?.[0]?.message||"Failed to follow user");return a}async function j(e){const t=`${v}/${e}/unfollow`,o=await fetch(t,{method:"PUT",headers:m()}),a=await o.json();if(!o.ok)throw new Error(a.errors?.[0]?.message||"Failed to unfollow user");return a}function q(e){if(e===E())return null;const t=document.createElement("button");return t.className="follow-btn text-primary",t.textContent=M(e)?"Unfollow":"Follow",t.dataset.username=e,t.addEventListener("click",async()=>{try{t.textContent==="Follow"?(await A(e),t.textContent="Unfollow",P(e,"add"),B(e,!0)):(await j(e),t.textContent="Follow",P(e,"remove"),B(e,!1))}catch(o){console.error("Failed to follow/unfollow",o)}}),t}function M(e){return(JSON.parse(localStorage.getItem("followingList"))||[]).includes(e)}function P(e,t){let o=JSON.parse(localStorage.getItem("followingList"))||[];t==="add"&&!o.includes(e)?o.push(e):t==="remove"&&(o=o.filter(a=>a!==e)),localStorage.setItem("followingList",JSON.stringify(o))}function B(e,t){document.querySelectorAll(`.follow-btn[data-username="${e}"]`).forEach(a=>{a.textContent=t?"Unfollow":"Follow"})}async function g(e=null){try{const t=document.getElementById("feed-post-container");if(!t)return;t.innerHTML="";const o=e||await w(),a=E();for(const n of o){const s=document.createElement("div");s.id="feed-boxes",s.className="post-box shadow rounded-3 p-3 mb-3",s.innerHTML=`
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center">
            <img src="${n.author?.avatar?.url??"/public/images/avatar.png"}" alt="${n.author?.avatar?.alt||"User avatar"}" class="rounded-circle me-2 user-avatar">
            <div>
              <strong class="h5 mb-0">
                <a href="/fed2-js2-ca-Mayamariaruth/profile/authorPosts/?username=${n.author?.name}" class="text-decoration-none text-white">
                  ${n.author?.name||"Unknown Author"}
                </a>
              </strong>
            <!-- Conditionally show Follow/Unfollow button -->
            ${n.author?.name!==a?'<div class="follow-btn-container"></div>':""}
            </div>
          </div>

          ${n.author?.name===a?`<div>
                   <button class="btn btn-sm me-2 edit-post-btn rounded-2" data-id="${n.id}"><i class="fa-solid fa-pen"></i></button>
                   <button class="btn btn-sm btn-outline-danger delete-post-btn rounded-2" data-id="${n.id}" data-title="${n.title}"><i class="fa-solid fa-trash-can"></i></button>
                 </div>`:""}
        </div>

        <a href="post/index.html?id=${n.id}" class="text-decoration-none text-reset">
          <div class="mb-3">
            <p class="post-title fw-bold h4">${n.title}</p>
            <p class="post-body">${n.body||""}</p>
            ${n.media?.url?`<img src="${n.media.url}" alt="${n.media.alt||"Post image"}" class="post-image img-fluid mt-2" />`:""}
          </div>
          <span class="posted-on">Posted on <strong>${new Date(n.created).toLocaleDateString()}</strong></span>
        </a>
      `;const r=q(n.author?.name),l=s.querySelector(".follow-btn-container");r&&l&&l.appendChild(r),t.appendChild(s)}document.querySelectorAll(".edit-post-btn").forEach(n=>n.addEventListener("click",C)),document.querySelectorAll(".delete-post-btn").forEach(n=>n.addEventListener("click",k))}catch(t){console.error("Failed to load posts:",t)}}async function D(){const e=localStorage.getItem("searchQuery"),t=document.getElementById("search-feedback"),o=document.getElementById("create-post-container");try{if(!y()&&!e){t&&(t.textContent="Please log in to view posts.");return}let a;e?(a=(await S(e)).data,t&&(t.textContent=a.length===0?"No posts found. Try searching for words in the title or body.":`Showing results for "${e}"`),o&&o.classList.add("d-none")):a=await w(),g(a),L();const n=document.getElementById("clear-search-btn");n&&(n.classList.toggle("d-none",!e),n.onclick=async()=>{t&&(t.textContent=""),n.classList.add("d-none");const s=await w();g(s),L(),o&&o.classList.remove("d-none");const r=document.getElementById("search-input"),l=document.getElementById("search-input-mobile");r&&(r.value=""),l&&(l.value="")})}catch(a){console.error("Failed to load feed:",a),d("Failed to load posts.","error")}}async function O({title:e,body:t,media:o}){if(!localStorage.getItem("accessToken"))throw new Error("You must be logged in to create a post.");const n={title:e,body:t};o&&o.url&&(n.media=o);try{const s=m(),r=await fetch(h,{method:"POST",headers:s,body:JSON.stringify(n)});if(!r.ok)throw new Error(`Error: ${r.statusText}`);return(await r.json()).data}catch(s){throw console.error("Error creating post:",s),new Error(`Failed to create post: ${s.message}`)}}async function R(e){const t=await fetch(`${v}/${e}`,{headers:m()});if(!t.ok){const a=await t.json();throw new Error(a.message||"Failed to load profile")}const{data:o}=await t.json();return o}async function _(){if(!y())return;const e=document.getElementById("create-post-container");if(!e)return;const t=E();if(!t)return;const o=await R(t);e.innerHTML=`
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
  `;const a=document.getElementById("create-post-form");a&&a.addEventListener("submit",H)}async function H(e){e.preventDefault();const t=e.target,o=t.title.value.trim(),a=t.body.value.trim(),n=t.mediaUrl.value.trim(),s=t.mediaAlt.value.trim(),r=[];if((!o||o.length<3)&&r.push("Title must be at least 3 characters long."),(!a||a.length<3)&&r.push("Post text must be at least 3 characters long."),n&&s)try{new URL(n)}catch{r.push("Image URL must be a valid URL.")}else(n||s)&&r.push("Both image URL and alt text are required if one is provided.");if(r.length>0){d(r.join(" "),"error");return}const l={title:o,body:a};n&&s&&(l.media={url:n,alt:s}),I();try{await O(l),d("Post created successfully!","success"),t.reset(),document.activeElement&&document.activeElement.blur(),bootstrap.Modal.getInstance(document.getElementById("create-post-modal")).hide(),await g()}catch(f){d(f.message,"error")}finally{x()}}_();D();const Q=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{I as a,J as b,Q as f,E as g,x as h,y as i,R as r,d as s,W as u};
