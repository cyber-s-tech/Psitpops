// Load component safely
async function loadComponent(id, file) {
  const element = document.getElementById(id);
 
  // If element does not exist on this page → skip
  if (!element) return;
 
  try {
    const res = await fetch(file);
    const html = await res.text();
    element.innerHTML = html;
  } catch (err) {
    console.error(`Error loading component: ${file}`, err);
  }
}
 
// Load all components
async function initPage() {
  await loadComponent("announcement", "/layouts/home/announcement.html");
 
  await loadComponent("header", "/components/header.html");
 
  await loadComponent("banner", "/layouts/home/banner.html");
  await loadComponent("topicBanner", "/layouts/topic/topic-banner.html");
  await loadComponent("about_banner", "/layouts/about/about_banner.html");
 
  await loadComponent("floating", "/layouts/home/floating.html");
 
  await loadComponent("featured", "/layouts/home/featured.html");

  await loadComponent("mission", "/layouts/about/mission.html");
  await loadComponent("find", "/layouts/about/find.html");
  await loadComponent("vision", "/layouts/about/vision.html");
  await loadComponent("Scripture", "/layouts/about/Scripture.html");
 
  await loadComponent("footer", "/components/footer.html");
 
  // Run header JS after header loads
  if (typeof initHeader === "function") {
    initHeader();
  }
 
  // Run blog API if exists
  if (typeof initBlog === "function") {
    initBlog();
  }
}
 
// Initialize page
document.addEventListener("DOMContentLoaded", initPage);