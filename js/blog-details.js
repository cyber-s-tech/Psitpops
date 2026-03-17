const domain = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const waitLayout = setInterval(()=>{

const blogTitle = document.getElementById("blogTitle");
const blogImage = document.getElementById("blogImage");
const blogContent = document.getElementById("blogContent");

if(!blogTitle) return;

clearInterval(waitLayout);

fetch(`${domain}/posts/${postId}?_embed`)
.then(res => res.json())
.then(post => {

blogTitle.innerHTML = post.title.rendered;

if(post._embedded["wp:featuredmedia"]){

blogImage.src =
post._embedded["wp:featuredmedia"][0].source_url;

}

blogContent.innerHTML =
post.content.rendered;

/* AUTHOR + DATE */

const author =
post._embedded.author[0].name;

const date =
new Date(post.date).toLocaleDateString("en-US",{
year:"numeric",
month:"long",
day:"numeric"
});

blogMeta.innerHTML = `
<div class="flex items-center gap-6 text-[#b9973e] text-sm">

  <div class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg"
         class="w-4 h-4 fill-[#b9973e]"
         viewBox="0 0 24 24">
      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 
      2.3-5 5 2.3 5 5 5zm0 2c-3.3 
      0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
    </svg>
    <span>${author}</span>
  </div>

  <div class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg"
         class="w-4 h-4 fill-[#b9973e]"
         viewBox="0 0 24 24">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 
      0-2 .9-2 2v14c0 1.1.9 2 2 
      2h14c1.1 0 2-.9 
      2-2V6c0-1.1-.9-2-2-2zm0 
      16H5V9h14v11z"/>
    </svg>
    <span>${date}</span>
  </div>

</div>
`;

/* RELATED POSTS */

const categoryId = post.categories[0];

fetch(`${domain}/posts?_embed&categories=${categoryId}&per_page=3`)
.then(res => res.json())
.then(posts => {

const container = document.getElementById("relatedPosts");

if(!container) return;

container.innerHTML = "";

posts.forEach(item => {

if(item.id == postId) return;

const image =
item._embedded["wp:featuredmedia"][0].source_url;

const author =
item._embedded.author[0].name;

const date =
new Date(item.date).toLocaleDateString("en-US",{
year:"numeric",
month:"long",
day:"numeric"
});

let excerpt =
item.excerpt.rendered.replace(/(<([^>]+)>)/gi,"");

excerpt = excerpt.split(" ").slice(0,20).join(" ");

container.innerHTML += `

<div class="bg-white rounded-2xl overflow-hidden shadow-sm">

<div class="relative">

<img src="${image}" 
class="w-full h-[200px] object-cover">

<span class="absolute top-3 left-3 bg-[#d6a21c] text-white text-xs px-3 py-1 rounded-full">
${item._embedded["wp:term"][0][0].name}
</span>

</div>

<div class="p-6">

<div class="flex items-center gap-6 text-xs text-[#b9973e] mb-3">

<div class="flex items-center gap-1">

<svg xmlns="http://www.w3.org/2000/svg"
class="w-4 h-4 fill-[#b9973e]"
viewBox="0 0 24 24">
<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 
2.3-5 5 2.3 5 5 5zm0 2c-3.3 
0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
</svg>

<span>${author}</span>

</div>

<div class="flex items-center gap-1">

<svg xmlns="http://www.w3.org/2000/svg"
class="w-4 h-4 fill-[#b9973e]"
viewBox="0 0 24 24">
<path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 
0-2 .9-2 2v14c0 1.1.9 2 2 
2h14c1.1 0 2-.9 
2-2V6c0-1.1-.9-2-2-2zm0 
16H5V9h14v11z"/>
</svg>

<span>${date}</span>

</div>

</div>

<hr class="mb-4">

<h3 class="text-[20px] font-semibold text-[#1F2A44] mb-2 leading-snug">
${item.title.rendered}
</h3>

<p class="text-sm text-gray-600 mb-4">
${excerpt}
</p>

<a href="blog-details.html?id=${item.id}"
class="text-[#d6a21c] text-sm font-medium">
Read More
</a>

</div>

</div>

`;

});

/* BLOG TOPICS */

fetch(`${domain}/categories`)
.then(res => res.json())
.then(categories => {

const container = document.getElementById("blogTopics");

if(!container) return;

container.innerHTML = "";

/* ONLY THESE TOPICS */

const allowedTopics = [
"Bible Study",
"Christian Living",
"Devotions",
"Faith",
"Hope",
"Prayer"
];

categories
.filter(cat => allowedTopics.includes(cat.name))
.forEach(cat => {

container.innerHTML += `

<li>
<a href="category.html?id=${cat.id}&name=${cat.name}"
class="flex items-center gap-3 hover:text-[#C9A227] transition">

<span class="w-4 h-4 bg-[#C9A227] rounded-full flex items-center justify-center text-white text-[10px]">
✓
</span>

<span>${cat.name}</span>

</a>
</li>

`;

});

});

/* RECENT POSTS */

fetch(`${domain}/posts?_embed&per_page=4`)
.then(res => res.json())
.then(posts => {

const container = document.getElementById("recentPosts");

if(!container) return;

container.innerHTML = "";

posts.forEach(post => {

const image =
post._embedded["wp:featuredmedia"][0].source_url;

container.innerHTML += `

<div class="flex gap-3">

<img src="${image}" 
class="w-[80px] h-[60px] object-cover rounded">

<div>

<h4 class="text-sm font-medium leading-snug text-[#1F2A44]">
${post.title.rendered}
</h4>

<a href="blog-details.html?id=${post.id}"
class="text-[#C9A227] text-sm">
Read More
</a>

</div>

</div>

`;

});

});

/* FEATURED ARTICLES */

fetch(`${domain}/posts?_embed&per_page=5`)
.then(res => res.json())
.then(posts => {

const container = document.getElementById("sidebarPosts");

if(!container) return;

container.innerHTML = "";

posts.forEach(post => {

const image =
post._embedded["wp:featuredmedia"][0].source_url;

container.innerHTML += `

<div class="flex gap-3 items-start">

<img src="${image}"
class="w-[95px] h-[70px] object-cover rounded-lg">

<div>

<h4 class="text-[14px] font-medium leading-snug text-[#1F2A44] mb-1">
${post.title.rendered}
</h4>

<a href="blog-details.html?id=${post.id}"
class="text-[#C9A227] text-sm font-medium">
Read More
</a>

</div>

</div>

`;

});

});

});

});

},100);

