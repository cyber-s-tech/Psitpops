const domain = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2";

/* FETCH ALL BLOGS */

fetch(`${domain}/posts?_embed&per_page=100`)
.then(res => res.json())
.then(posts => {

let container = document.getElementById("allBlogs");

container.innerHTML = "";

posts.forEach(post => {

let image = "";

if(post._embedded["wp:featuredmedia"]){
image = post._embedded["wp:featuredmedia"][0].source_url;
}

container.innerHTML += `

<div class="card">

<img src="${image}">

<div class="card-body">

<h3>${post.title.rendered}</h3>

<p>${post.excerpt.rendered}</p>

<a href="blog-details.html?id=${post.id}">
Read More
</a>

</div>

</div>

`;

});

});