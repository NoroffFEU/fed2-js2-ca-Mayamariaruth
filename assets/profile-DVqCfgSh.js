import{g as m,r as f,M as s,s as n,a as u,h as b}from"./feed-FQitdmyJ.js";import{a as p,h as v}from"./authorPosts-ya0caLeO.js";async function c(){const l=m();if(l)try{const e=await f(l),t=document.getElementById("profile-username"),o=document.getElementById("profile-email"),r=document.getElementById("profile-bio"),a=document.getElementById("profile-avatar");t&&(t.textContent=e.name),o&&(o.textContent=e.email),r&&(r.textContent=e.bio||"No bio provided"),a&&(a.src=e.avatar?.url||"/public/images/avatar.png",a.alt=e.avatar?.alt||"User avatar")}catch(e){console.error("Error loading profile:",e)}}async function y(l,{avatar:e,bio:t}){const o=`${p}/${l}`,a=await fetch(o,{method:"PUT",headers:v(),body:JSON.stringify({avatar:{url:e,alt:"User's avatar"},bio:t})}),i=await a.json();if(!a.ok)throw new Error(i.errors?.[0]?.message||"Failed to update profile");return i.data}async function g(){const l=document.getElementById("profile-avatar").src,e=document.getElementById("profile-bio").textContent,t=`
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
  `;document.body.insertAdjacentHTML("beforeend",t);const o=document.getElementById("edit-profile-modal");new s(o).show(),o._element.addEventListener("shown.bs.modal",()=>{const i=document.querySelector(".modal-backdrop");i&&i.removeAttribute("aria-hidden")});const a=document.getElementById("edit-profile-form");a&&a.addEventListener("submit",E)}async function E(l){l.preventDefault();const e=document.getElementById("profile-username").textContent,t=document.getElementById("avatar-url").value,o=document.getElementById("bio").value;if(t)try{new URL(t)}catch{n("Avatar must be a valid URL.","error");return}u();try{const r=await y(e,{avatar:t,bio:o}),i={...JSON.parse(localStorage.getItem("profile"))||{},avatar:r.avatar,bio:r.bio};localStorage.setItem("profile",JSON.stringify(i)),await c();const d=document.getElementById("edit-profile-modal");new s(d).hide(),d.remove(),n("Profile updated successfully!","success")}catch(r){n(r.message||"Failed to update profile.","error")}finally{b()}}c();const h=document.getElementById("edit-profile-btn");h.addEventListener("click",g);
