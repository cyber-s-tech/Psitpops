function initSearch() {
  const input = document.getElementById("searchBlog");
  const button = document.getElementById("searchBtn");
  const suggestionsBox = document.getElementById("suggestions");

  //  STOP if elements not found
  if (!input || !button || !suggestionsBox) return;

  let posts = [];

  // FETCH BLOGS
  async function fetchBlogs() {
    try {
      const res = await fetch("https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2/posts?_embed");
      posts = await res.json();
    } catch (err) {
      console.log("API error:", err);
    }
  }

  fetchBlogs();
  console.log("Input:", input);
console.log("Button:", button);

  //  INPUT
  input.addEventListener("input", function () {
    const query = input.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (!query) {
      suggestionsBox.classList.add("hidden");
      return;
    }

    const filtered = posts.filter(post =>
      post.title.rendered.toLowerCase().includes(query)
    );

    if (!filtered.length) {
      suggestionsBox.classList.add("hidden");
      return;
    }

    suggestionsBox.classList.remove("hidden");

    filtered.slice(0, 5).forEach(post => {
  const title = post.title.rendered.replace(/<[^>]+>/g, "");
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  const div = document.createElement("div");

  div.className = `
    flex items-center gap-3 p-3 cursor-pointer 
    hover:bg-gray-100 transition-all
  `;

  div.innerHTML = `
    <img src="${image}" 
      class="w-12 h-12 object-cover rounded-md flex-shrink-0" />

    <p class="text-sm font-medium text-[#1F2A44] line-clamp-2">
      ${title}
    </p>
  `;

  div.onclick = () => {
  suggestionsBox.classList.add("hidden");
  window.location.href = `/blog-details.html?id=${post.id}`;
};

  suggestionsBox.appendChild(div);
});
  });

  //  BUTTON
  document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "searchBtn") {
    const input = document.getElementById("searchBlog");

    const query = input.value.trim();
    if (!query) return;

    window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
  }
});
document.addEventListener("keypress", function (e) {
  if (e.target && e.target.id === "searchBlog" && e.key === "Enter") {
    e.preventDefault();

    const query = e.target.value.trim();
    if (!query) return;

    window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
  }
});
}



//  WAIT FOR DYNAMIC CONTENT
window.addEventListener("load", () => {
  setTimeout(initSearch, 500); // wait for sidebar render
});