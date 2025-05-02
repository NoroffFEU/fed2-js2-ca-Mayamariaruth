import{c as s,h as d}from"./headers-BP1T59_6.js";import{g as m,s as n}from"./app-B_7pJRUT.js";async function f(o){const e=await fetch(`${s}/${o}`,{headers:d()});if(!e.ok){const r=await e.json();throw new Error(r.message||"Failed to load profile")}const{data:t}=await e.json();return t}async function c(){const o=m();if(o)try{const e=await f(o),t=document.getElementById("profile-username"),r=document.getElementById("profile-email"),a=document.getElementById("profile-bio"),l=document.getElementById("profile-avatar");t&&(t.textContent=e.name),r&&(r.textContent=e.email),a&&(a.textContent=e.bio||"No bio provided"),l&&(l.src=e.avatar?.url||"/public/images/avatar.png",l.alt=e.avatar?.alt||"User avatar")}catch(e){console.error("Error loading profile:",e)}}async function u(o,{avatar:e,bio:t}){const r=`${s}/${o}`,l=await fetch(r,{method:"PUT",headers:d(),body:JSON.stringify({avatar:{url:e,alt:"User's avatar"},bio:t})}),i=await l.json();if(!l.ok)throw new Error(i.errors?.[0]?.message||"Failed to update profile");return i.data}async function b(){const o=document.getElementById("profile-avatar").src,e=document.getElementById("profile-bio").textContent,t=`
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
                <input type="text" class="form-control" id="avatar-url" name="avatar" placeholder="Enter avatar image URL" value="${o}">
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
  `;document.body.insertAdjacentHTML("beforeend",t),new bootstrap.Modal(document.getElementById("edit-profile-modal")).show();const a=document.getElementById("edit-profile-form");a&&a.addEventListener("submit",p)}async function p(o){o.preventDefault();const e=document.getElementById("profile-username").textContent,t=document.getElementById("avatar-url").value,r=document.getElementById("bio").value;if(t)try{new URL(t)}catch{n("Avatar must be a valid URL.","error");return}try{const a=await u(e,{avatar:t,bio:r}),i={...JSON.parse(localStorage.getItem("profile"))||{},avatar:a.avatar,bio:a.bio};localStorage.setItem("profile",JSON.stringify(i)),await c(),bootstrap.Modal.getInstance(document.getElementById("edit-profile-modal")).hide(),document.getElementById("edit-profile-modal").remove(),n("Profile updated successfully!","success")}catch(a){n(a.message||"Failed to update profile.","error")}}c();const v=document.getElementById("edit-profile-btn");v.addEventListener("click",b);
