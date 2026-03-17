// Load component safely
async function loadComponent(id, file) {
  const element = document.getElementById(id);

  // If element does not exist on this page → skip
  if (!element) return;
 
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
  await loadComponent("contact-banner", "/layouts/contact/contact-banner.html");

  await loadComponent("contact-cards", "/layouts/contact/contact-cards.html");

   await loadComponent("contact-gridform", "/layouts/contact/contact-gridform.html");

  await loadComponent("floating", "/layouts/home/floating.html");

  await loadComponent("featured", "/layouts/home/featured.html");

  await loadComponent("blogBanner", "/layouts/blog-details/blog-banner.html");

  await loadComponent("blogLayout", "/layouts/blog-details/blog-layout.html");

  await loadComponent("blogSidebar", "/layouts/blog-details/blog-sidebar.html");

  await loadComponent("relatedBlogs", "/layouts/blog-details/related-blogs.html");

  await loadComponent("footer", "/components/footer.html");
     await loadComponent("explore", "/layouts/blog/explore.html");
   await loadComponent("blog-banner", "/layouts/blog/banner.html");


  // Run header JS after header loads
  if (typeof initHeader === "function") {
    initHeader();
  }
  // Run blog API if exists
  if (typeof initBlog === "function") {
    initBlog();
  }
    if (typeof initTopicsOnly === "function") {
    initTopicsOnly();
  }
  if(typeof initTopicSlider==="function"){
    initTopicSlider()
  }
}


 
// Initialize page
document.addEventListener("DOMContentLoaded", initPage);