import{g as s,r as c,s as n}from"./feed-B7ORXTyZ.js";import{a as m,h as f}from"./authorPosts-a1AKxWD9.js";async function d(){const l=s();if(l)try{const e=await c(l),a=document.getElementById("profile-username"),r=document.getElementById("profile-email"),t=document.getElementById("profile-bio"),o=document.getElementById("profile-avatar");a&&(a.textContent=e.name),r&&(r.textContent=e.email),t&&(t.textContent=e.bio||"No bio provided"),o&&(o.src=e.avatar?.url||"/public/images/avatar.png",o.alt=e.avatar?.alt||"User avatar")}catch(e){console.error("Error loading profile:",e)}}async function u(l,{avatar:e,bio:a}){const r=`${m}/${l}`,o=await fetch(r,{method:"PUT",headers:f(),body:JSON.stringify({avatar:{url:e,alt:"User's avatar"},bio:a})}),i=await o.json();if(!o.ok)throw new Error(i.errors?.[0]?.message||"Failed to update profile");return i.data}async function b(){const l=document.getElementById("profile-avatar").src,e=document.getElementById("profile-bio").textContent,a=`
    <div class="modal fade" id="edit-profile-modal" tabindex="-1" aria-labelledby="edit-profile-modal-label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content rounded-3">
          <div class="modal-header">
            <h2 class="modal-title" id="edit-profile-modal-label">Edit Profile</h2>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="edit-profile-form">
              <div class="mb-3">
                <label for="avatar-url" class="form-label">Avatar URL</label>
                <input type="text" class="form-control" id="avatar-url" name="avatar" placeholder="Enter avatar image URL" value="${l}">
              </div>
              <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>
                <textarea class="form-control" id="bio" name="bio" rows="6" placeholder="Enter your bio">${e}</textarea>
              </div>
              <button type="submit" class="btn submit-btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",a);const r=new bootstrap.Modal(document.getElementById("edit-profile-modal"));r.show(),r._element.addEventListener("shown.bs.modal",()=>{const o=document.querySelector(".modal-backdrop");o&&o.removeAttribute("aria-hidden")});const t=document.getElementById("edit-profile-form");t&&t.addEventListener("submit",p)}async function p(l){l.preventDefault();const e=document.getElementById("profile-username").textContent,a=document.getElementById("avatar-url").value,r=document.getElementById("bio").value;if(a)try{new URL(a)}catch{n("Avatar must be a valid URL.","error");return}try{const t=await u(e,{avatar:a,bio:r}),i={...JSON.parse(localStorage.getItem("profile"))||{},avatar:t.avatar,bio:t.bio};localStorage.setItem("profile",JSON.stringify(i)),await d(),bootstrap.Modal.getInstance(document.getElementById("edit-profile-modal")).hide(),document.getElementById("edit-profile-modal").remove(),n("Profile updated successfully!","success")}catch(t){n(t.message||"Failed to update profile.","error")}}d();const v=document.getElementById("edit-profile-btn");v.addEventListener("click",b);
