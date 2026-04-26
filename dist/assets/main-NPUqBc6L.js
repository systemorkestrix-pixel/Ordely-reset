import{c as L,B as M,n as u,g as k}from"./site-settings-BFFIKg6j.js";const S="https://zgrwmtxxledzzvidemqd.supabase.co",_="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncndtdHh4bGVkenp2aWRlbXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTQ2NzYsImV4cCI6MjA5MjYzMDY3Nn0.VVw29M6LNd12cu77Nho4b5VsQWbf3Q59V9twJdsCBxs",C=!!_,m=C?L(S,_):null,l="__all__",o={...M},B=[{key:"facebook_url",label:"فيسبوك",className:"facebook",icon:"facebook"},{key:"instagram_url",label:"إنستغرام",className:"instagram",icon:"instagram"},{key:"tiktok_url",label:"تيك توك",className:"tiktok",icon:"tiktok"}],E=[{key:"phone_number",label:"اتصال",className:"btn-call",icon:"phone"},{key:"whatsapp_url",label:"واتساب",className:"btn-whatsapp",icon:"whatsapp"},{key:"telegram_url",label:"تلجرام",className:"btn-telegram",icon:"telegram"},{key:"google_maps_url",label:"الموقع",className:"btn-map",icon:"map"}];let r=[],d=[],i=null,c={...o};const N=document.getElementById("heroSection"),v=document.querySelector(".category-bar"),y=document.getElementById("categoryContainer"),f=document.getElementById("productsContainer"),g=document.getElementById("socialLinks"),h=document.getElementById("stickyBottomBar");function I(t){switch(t){case"facebook":return`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.9.3-1.6 1.7-1.6H16.7V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.5v7h3z" fill="currentColor"/>
        </svg>
      `;case"instagram":return`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>
        </svg>
      `;case"tiktok":return`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.2 4c.5 1.7 1.8 3 3.5 3.5v2.8c-1.3 0-2.5-.4-3.5-1v5.2a4.5 4.5 0 1 1-4.5-4.5c.3 0 .7 0 1 .1v2.9a2 2 0 1 0 1 1.7V4h2.5z" fill="currentColor"/>
        </svg>
      `;case"telegram":return`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.7 4.5 3.8 11c-.8.3-.8 1.4.1 1.6l4.3 1.3 1.6 4.8c.2.7 1.1.9 1.6.3l2.4-2.9 4.8 3.5c.7.5 1.7.1 1.9-.8l2.6-12.4c.2-1-.8-1.8-1.7-1.4ZM9.3 13.4l8-5.1-6.3 6.8-.3 2.8-1.4-4.5Z" fill="currentColor"/>
        </svg>
      `;case"whatsapp":return`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.5-1.2A8.5 8.5 0 1 0 12 3.5Zm0 14.8c-1.2 0-2.3-.3-3.3-.9l-.2-.1-2.7.7.7-2.6-.2-.2A6.8 6.8 0 1 1 12 18.3Zm3.8-5.1c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1l-.4.6c-.1.2-.3.2-.5.1-.7-.3-2.1-1.3-2.5-2.2-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.5l-.6-1.3c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.4.1-.5.3-.2.3-.6.8-.6 1.8s.7 2.1.8 2.2c.1.1 1.4 2.2 3.5 3 .5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.1-.4 1.3-.9.2-.5.2-1 .1-1.1-.1-.1-.3-.1-.5-.2Z" fill="currentColor"/>
        </svg>
      `;case"phone":return`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.7 4.8c.4-.4 1-.6 1.6-.4l2.2.7c.7.2 1.1.9 1 1.6l-.2 2.1c0 .4.1.8.4 1.1l2.3 2.3c.3.3.7.5 1.1.4l2.1-.2c.7-.1 1.4.3 1.6 1l.7 2.2c.2.6 0 1.2-.4 1.6l-1 1c-.7.7-1.8 1-2.8.8-2.2-.5-4.4-1.7-6.3-3.7-1.9-1.9-3.2-4.1-3.7-6.3-.2-1 .1-2.1.8-2.8l1-1Z" fill="currentColor"/>
        </svg>
      `;case"map":return`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Zm0-8.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" fill="currentColor"/>
        </svg>
      `;default:return""}}function T(t){const e=String((t==null?void 0:t.message)||(t==null?void 0:t.details)||"").toLowerCase();return e.includes("order_index")&&e.includes("column")}function b(t){const e=String((t==null?void 0:t.message)||(t==null?void 0:t.details)||"").toLowerCase();return e.includes("site_settings")&&(e.includes("schema cache")||e.includes("does not exist")||e.includes("relation"))}function $(){N.style.backgroundImage=c.hero_image_url?`url("${c.hero_image_url}")`:"none"}function x(){const t=B.map(e=>({...e,href:k(e.key,c[e.key])})).filter(e=>e.href);if(t.length===0){g.hidden=!0,g.innerHTML="";return}g.hidden=!1,g.innerHTML=t.map(e=>`
    <a
      href="${e.href}"
      class="social-link social-link-${e.className}"
      target="_blank"
      rel="noopener"
      aria-label="${e.label}"
      title="${e.label}"
    >
      <span class="platform-icon" aria-hidden="true">${I(e.icon)}</span>
    </a>
  `).join("")}function A(){const t=E.map(e=>{const n=k(e.key,c[e.key]);return n?{href:n,label:e.label,className:e.className,icon:e.icon,external:e.key!=="phone_number"}:null}).filter(Boolean);if(document.body.classList.toggle("has-sticky-actions",t.length>0),t.length===0){h.hidden=!0,h.innerHTML="";return}h.hidden=!1,h.innerHTML=t.map(e=>`
    <a
      href="${e.href}"
      class="btn ${e.className}"
      ${e.external?'target="_blank" rel="noopener"':""}
      aria-label="${e.label}"
      title="${e.label}"
    >
      <span class="platform-icon" aria-hidden="true">${I(e.icon)}</span>
    </a>
  `).join("")}function H(){if(y.innerHTML="",!r.length){v.hidden=!0;return}v.hidden=!1,[{id:l,name:"الكل",icon:"🍽️"},...r].forEach(e=>{const n=e.id===l?l:e.name,a=document.createElement("div");a.className=`category-item ${n===i?"active":""}`,a.onclick=()=>{i=n,document.querySelectorAll(".category-item").forEach(s=>s.classList.remove("active")),a.classList.add("active"),w()},a.innerHTML=`
      <div class="category-icon">${e.icon||"🍽️"}</div>
      <span class="category-label">${e.name}</span>
    `,y.appendChild(a)})}function w(){f.innerHTML="";const t=i&&i!==l?d.filter(e=>e.category===i):d;if(t.length===0){const e=i&&i!==l?"لا توجد منتجات في هذا التصنيف حاليًا.":"لا توجد منتجات متاحة حاليًا.";f.innerHTML=`<div class="empty-state">${e}</div>`;return}t.forEach(e=>{const n=document.createElement("div");n.className="product-card";const a=e.image_url?`<img class="product-image" src="${e.image_url}" alt="${e.name}" loading="lazy" />`:'<div class="product-image-placeholder">بدون صورة</div>';n.innerHTML=`
      <div class="product-image-wrap">
        <div class="product-price-badge">${e.price} د.ج</div>
        ${a}
      </div>
      <div class="product-info">
        <h3 class="product-name">${e.name}</h3>
      </div>
    `,f.appendChild(n)})}async function z(){try{if(!C)c=u(o),r=[],d=[];else{const t=m.from("site_settings").select("*").eq("id","default").maybeSingle();let e=m.from("categories").select("*").order("order_index");const n=m.from("products").select("*").eq("is_available",!0);let[a,s,p]=await Promise.all([t,e,n]);if(s.error&&T(s.error)&&(s=await m.from("categories").select("*")),a.error&&!b(a.error))throw a.error;if(s.error)throw s.error;if(p.error)throw p.error;r=s.data||[],d=p.data||[],c=a.error&&b(a.error)?u(o):u(a.data||o)}}catch(t){console.error("Error loading data:",t),c=u(o),r=[],d=[]}i=r.length?l:null,$(),x(),A(),H(),w()}document.addEventListener("DOMContentLoaded",()=>{z()});
