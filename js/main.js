async function loadComponent(id, file) {
 
  const res = await fetch(file);
  const html = await res.text();
 
  document.getElementById(id).innerHTML = html;
 
}
 
// Load all components in correct order
async function initPage(){
 
  await loadComponent("announcement", "/layouts/home/announcement.html");
 
  await loadComponent("header", "/components/header.html");
 
  await loadComponent("banner", "/layouts/home/banner.html");
 
  await loadComponent("floating", "/layouts/home/floating.html");
 
  await loadComponent("featured", "/layouts/home/featured.html");
 
  await loadComponent("footer", "/components/footer.html");
 
 
  // All layout loaded → run blog api
  if(typeof initBlog === "function"){
    initBlog();
  }
 
}
 
initPage();
 