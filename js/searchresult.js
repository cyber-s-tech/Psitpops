const domain = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2";

// GET QUERY
const params = new URLSearchParams(window.location.search);
const query = params.get("query")?.toLowerCase().trim() || "";

const container = document.getElementById("searchresult");

// ❌ NO QUERY
if (!query) {
  container.innerHTML = `
    <div class="text-center py-20">
      <h2 class="text-2xl font-bold">No search query</h2>
    </div>
  `;
} else {

  fetch(`${domain}/posts?_embed&per_page=100`)
    .then(res => res.json())
    .then(posts => {

      // ✅ CLEAN + FILTER
      const filteredPosts = posts.filter(post => {
        const title = post.title.rendered
          .replace(/<[^>]+>/g, "")
          .toLowerCase();

        return title.includes(query);
      });

      // ❌ NO RESULT
      if (filteredPosts.length === 0) {
        container.innerHTML = `
          <div class="text-center py-20">
            <h2 class="text-2xl font-bold">No results found</h2>
            <p class="text-gray-500 mt-2">Try another keyword</p>
          </div>
        `;
        return;
      }

      // ✅ SAME DESIGN AS BLOG CARDS
      let html = `
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <h2 class="text-2xl font-bold mb-8">
          Search Results for: "${query}"
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      `;

      filteredPosts.forEach(post => {

        const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
        const author = post._embedded?.["author"]?.[0]?.name || "Admin";
        const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "General";

        const date = new Date(post.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });

        html += `
        <div class="bg-white border border-[#E5C367]/30 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-all group">
          
          <div class="relative w-full h-48 overflow-hidden">
            <img src="${image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
            
            <span class="absolute top-4 left-4 bg-[#D4AF37] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
              ${category}
            </span>
          </div>

          <div class="p-6">
            <h2 class="text-lg font-bold mb-2">${post.title.rendered}</h2>

            <div class="text-sm text-gray-500 mb-2">
              ${author} • ${date}
            </div>

            <button onclick="goToBlog(${post.id})" 
              class="mt-3 text-[#C9A227] font-semibold hover:underline">
              Read More →
            </button>
          </div>

        </div>
        `;
      });

      html += `</div></div>`;

      container.innerHTML = html;
    })
    .catch(err => {
      container.innerHTML = `
        <p class="text-center py-20 text-red-500">Something went wrong</p>
      `;
      console.log(err);
    });
}


// ✅ CORRECT REDIRECT
function goToBlog(id) {
  window.location.href = `/blog-details.html?id=${id}`;
}