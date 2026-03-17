const domain = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2";

function initCategory(){

const params = new URLSearchParams(window.location.search);

const categoryId = params.get("id");
const categoryName = params.get("name");


/* WAIT UNTIL BANNER LOADS */

const waitBanner = setInterval(()=>{

const titleElement = document.getElementById("categoryTitle");
const bannerElement = document.getElementById("categoryBanner");

if(!titleElement || !bannerElement) return;

clearInterval(waitBanner);


/* SET TITLE */

titleElement.innerText = categoryName;


/* FEATURE TITLE */

const featuredTitle = document.getElementById("featuredTitle");

if(featuredTitle){
featuredTitle.innerText = `Featured Article in ${categoryName}`;
}


/* BANNER IMAGE */

fetch(`${domain}/categories/${categoryId}`)
.then(res => res.json())
.then(cat => {

if(cat.acf && cat.acf.category_image){

fetch(`${domain}/media/${cat.acf.category_image}`)
.then(res => res.json())
.then(media => {

bannerElement.src = media.source_url;

});

}

});


/* POSTS */

fetch(`${domain}/posts?_embed&categories=${categoryId}`)
.then(res => res.json())
.then(posts => {

const container = document.getElementById("categoryPosts");
const template = document.getElementById("categoryTemplate");

const featuredContainer = document.getElementById("featuredPost");
const featuredTemplate = document.getElementById("featuredTemplate");

if(!container || !template) return;

container.innerHTML = "";


/* FEATURED POST */

const firstPost = posts[0];

const featuredClone = featuredTemplate.content.cloneNode(true);

featuredClone.querySelector(".featured-image").src =
firstPost._embedded["wp:featuredmedia"][0].source_url;

featuredClone.querySelector(".featured-category").innerText =
firstPost._embedded["wp:term"][0][0].name;

featuredClone.querySelector(".featured-title").innerHTML =
firstPost.title.rendered;

let featuredExcerpt = firstPost.excerpt.rendered.replace(/(<([^>]+)>)/gi,"");

featuredExcerpt = featuredExcerpt.split(" ").slice(0,30).join(" ");

featuredClone.querySelector(".featured-excerpt").innerText = featuredExcerpt;

featuredClone.querySelector(".featured-author").innerText =
firstPost._embedded["author"][0].name;

featuredClone.querySelector(".featured-date").innerText =
new Date(firstPost.date).toLocaleDateString();

featuredClone.querySelector(".featured-link").href =
`blog-details.html?id=${firstPost.id}`;

featuredContainer.appendChild(featuredClone);


/* GRID POSTS */

posts.slice(1).forEach(post => {

const clone = template.content.cloneNode(true);

clone.querySelector(".category-image").src =
post._embedded["wp:featuredmedia"][0].source_url;

clone.querySelector(".category-name").innerText =
post._embedded["wp:term"][0][0].name;

clone.querySelector(".category-title").innerHTML =
post.title.rendered;

let excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi,"");

let words = excerpt.split(" ").slice(0,20).join(" ") ;

clone.querySelector(".category-excerpt").innerText = words;

clone.querySelector(".author span").innerText =
post._embedded["author"][0].name;

clone.querySelector(".date span").innerText =
new Date(post.date).toLocaleDateString();

clone.querySelector(".read-more").href =
`blog-details.html?id=${post.id}`;

container.appendChild(clone);

});

});

},100);

}

document.addEventListener("DOMContentLoaded", initCategory);