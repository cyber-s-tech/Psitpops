function initSearch() {

  //  BLOG SEARCH ELEMENTS  
  const blogInput = document.getElementById("searchBlog");
  const blogBtn = document.getElementById("searchBtn");
  const blogSuggestions = document.getElementById("suggestions");

  //  HEADER SEARCH ELEMENTS
  const headerInput = document.getElementById("searchInput");
  const headerBtn = document.getElementById("headerSearchBtn");
  const headerSuggestions = document.getElementById("headerSuggestions");

  //  MOBILE SEARCH ELEMENTS
  // 📱 MOBILE
const mobileInput = document.getElementById("mobileSearchInput");
const mobileSuggestions = document.getElementById("mobileSuggestions");

  let posts = [];

  // =========================
  // 📡 FETCH BLOG DATA (COMMON)
  // =========================
  async function fetchBlogs() {
    try {
      const res = await fetch("https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2/posts?_embed");
      posts = await res.json();
    } catch (err) {
      console.log("API error:", err);
    }
  }

  fetchBlogs();

  // =========================
  // 🧠 COMMON SUGGESTION LOGIC
  // =========================
  function handleSuggestions(input, box) {
    const query = input.value.toLowerCase().trim();
    box.innerHTML = "";

    if (!query) {
      box.classList.add("hidden");
      return;
    }

    const filtered = posts.filter(post =>
      post.title.rendered.toLowerCase().includes(query)
    );

    if (!filtered.length) {
      box.classList.add("hidden");
      return;
    }

    box.classList.remove("hidden");

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
        box.classList.add("hidden");
        window.location.href = `/blog-details.html?id=${post.id}`;
      };

      box.appendChild(div);
    });
  }

  // BLOG INPUT
  if (blogInput && blogSuggestions) {
    blogInput.addEventListener("input", () => {
      handleSuggestions(blogInput, blogSuggestions);
    });
  }

  // HEADER INPUT
  if (headerInput && headerSuggestions) {
    headerInput.addEventListener("input", () => {
      handleSuggestions(headerInput, headerSuggestions);
    });
  }

  // MOBILE INPUT
if (mobileInput && mobileSuggestions) {
  mobileInput.addEventListener("input", () => {
    handleSuggestions(mobileInput, mobileSuggestions);
  });
}

  //  BUTTON CLICK (BOTH)
  document.addEventListener("click", function (e) {

    // BLOG BUTTON
    if (e.target && e.target.id === "searchBtn") {
      const query = blogInput.value.trim();
      if (!query) return;
      window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
    }

    // HEADER BUTTON
    if (e.target && e.target.id === "headerSearchBtn") {

      // 🔥 Expand input first
      if (headerInput.classList.contains("w-0")) {
        headerInput.classList.remove("w-0", "opacity-0");
        headerInput.classList.add("w-40", "opacity-100");
        headerInput.focus();
        return;
      }

      // Then search
      const query = headerInput.value.trim();
      if (!query) return;
      window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
    }

  });

  // ⌨️ ENTER KEY (BOTH)  
  document.addEventListener("keypress", function (e) {

    // BLOG ENTER
    if (e.target && e.target.id === "searchBlog" && e.key === "Enter") {
      e.preventDefault();
      const query = e.target.value.trim();
      if (!query) return;
      window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
    }

    // HEADER ENTER
    if (e.target && e.target.id === "searchInput" && e.key === "Enter") {
      e.preventDefault();
      const query = e.target.value.trim();
      if (!query) return;
      window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
    }

    // MOBILE ENTER
if (e.target && e.target.id === "mobileSearchInput" && e.key === "Enter") {
  e.preventDefault();
  const query = e.target.value.trim();
  if (!query) return;
  window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
}

  });

  //  CLOSE SUGGESTIONS ON OUTSIDE CLICK
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#searchBlog")) {
      blogSuggestions?.classList.add("hidden");
    }
    if (!e.target.closest("#searchInput")) {
      headerSuggestions?.classList.add("hidden");
    }
    if (!e.target.closest("#mobileSearchInput")) {
      headerSuggestions?.classList.add("hidden");
    }
  });

}


// =========================
// ⏳ WAIT FOR TEMPLATE LOAD
// =========================
window.addEventListener("load", () => {
  setTimeout(initSearch, 500);
});