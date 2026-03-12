const domain = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2";

/* FEATURED DEVOTIONALS */

fetch(`${domain}/posts?_embed&categories=3`)
  .then((res) => res.json())
  .then((posts) => {
    let container = document.getElementById("featuredPosts");

    posts.forEach((post) => {
      let image = post._embedded["wp:featuredmedia"][0].source_url;

      container.innerHTML += `
<div class="card">

<img src="${image}">

<div class="card-body">
<h3>${post.title.rendered}</h3>
<p>${post.excerpt.rendered}</p>
<a href="blog-details.html?id=${post.id}">Read More</a>
</div>

</div>
`;
    });
  });

/* EXPLORE BY TOPIC */

fetch(`${domain}/categories`)
.then((res) => res.json())
.then((categories) => {

let container = document.getElementById("topicsGrid");

container.innerHTML = "";

/* desired order */

const topicOrder = [
"Prayer",
"Faith",
"Hope",
"Bible Study",
"Christian Living",
"Devotions"
];

/* sort categories */

categories.sort((a,b)=>{
return topicOrder.indexOf(a.name) - topicOrder.indexOf(b.name);
});

categories.forEach((cat)=>{

if(cat.acf && cat.acf.category_image){

fetch(`${domain}/media/${cat.acf.category_image}`)
.then((res)=>res.json())
.then((media)=>{

let imageUrl = media.source_url;

container.innerHTML += `

<a href="category.html?id=${cat.id}&name=${encodeURIComponent(cat.name)}" class="topic-card">

<img src="${imageUrl}">

<div class="topic-title">
${cat.name}
</div>

</a>

`;

});

}

});

});

/* LATEST ARTICLES */

fetch(`${domain}/posts?_embed&per_page=4`)
.then(res => res.json())
.then(posts => {

let container = document.getElementById("latestPosts");

container.innerHTML = "";

posts.forEach(post => {

let image = "";
let category = "";
let author = "";
let date = new Date(post.date).toLocaleDateString();

if(post._embedded["wp:featuredmedia"]){
image = post._embedded["wp:featuredmedia"][0].source_url;
}

if(post._embedded["wp:term"]){
category = post._embedded["wp:term"][0][0].name;
}

if(post._embedded["author"]){
author = post._embedded["author"][0].name;
}

container.innerHTML += `

<div class="latest-card">

<div class="latest-img">

<img src="${image}">

<span class="badge">${category}</span>

</div>

<div class="latest-body">

<div class="meta">

<span class="author">
👤 ${author}
</span>

<span class="date">
📅 ${date}
</span>

</div>

<h3>${post.title.rendered}</h3>

<p>${post.excerpt.rendered}</p>

<a href="blog-details.html?id=${post.id}" class="read-more">
Read More
</a>

</div>

</div>

`;

});

});