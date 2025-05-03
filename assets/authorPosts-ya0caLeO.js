const p="8b8f0c57-e816-4800-acd0-6950ca938a84",i="https://v2.api.noroff.dev",d=`${i}/auth`,l=`${i}/social`,f=`${d}/login`,A=`${d}/register`,$=`${l}/posts`,m=`${l}/profiles`;function u(){const e=new Headers;e.append("X-Noroff-API-Key",p);const s=localStorage.getItem("accessToken");return s&&e.append("Authorization",`Bearer ${s}`),e.append("Content-Type","application/json"),e}async function h(e){const s=`${m}/${e}/posts?_author=true`,a=await fetch(s,{headers:u()}),t=await a.json();if(!a.ok)throw new Error(t.errors?.[0]?.message||"Failed to fetch user's posts");return t.data}async function g(){const e=document.getElementById("author-feed-container");if(!e)return;const a=new URLSearchParams(window.location.search).get("username");if(!a){e.innerHTML="<p>User posts not found.</p>";return}try{const t=await h(a);e.innerHTML="";const o=document.createElement("h1");o.className="mt-4 mb-2 mx-4",o.textContent=`${a}'s posts`;const r=document.createElement("p");r.className="mx-4 mb-4",r.textContent=`${t.length} post${t.length!==1?"s":""}`,e.appendChild(o),e.appendChild(r),t.forEach(n=>{const c=document.createElement("div");c.className="card mx-auto mt-4 text-white pt-1 post-card",c.innerHTML=`
          <div class="card-body">
            <h2 class="card-title mb-3">${n.title}</h2>
            <p class="card-text mb-3 h5">${n.body||""}</p>
            ${n.media?.url?`<img src="${n.media.url}" alt="${n.media.alt||"Post image"}" class="post-image img-fluid mb-4">`:""}
            <div class="mb-2">
              <span>By <strong>${n.author?.name||"Unknown Author"}</strong></span> |
              <span>${new Date(n.created).toLocaleDateString()}</span>
            </div>
          </div>
        `,e.appendChild(c)})}catch(t){console.error("Failed to render author's posts:",t),e.innerHTML="<p>Something went wrong while loading posts.</p>"}}g();const P=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{$ as A,m as a,f as b,A as c,P as d,u as h};
