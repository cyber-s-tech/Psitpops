const domain = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2";
 
/* FEATURED DEVOTIONALS */
 
fetch(`${domain}/posts?_embed&categories=3`)
.then(res=>res.json())
.then(posts=>{
 
const container=document.getElementById("featuredPosts");
const template=document.getElementById("featuredTemplate");
 
posts.forEach(post=>{
 
const clone=template.content.cloneNode(true);
 
clone.querySelector(".post-image").src=
post._embedded["wp:featuredmedia"][0].source_url;
 
clone.querySelector(".post-category").innerText=
post._embedded["wp:term"][0][0].name;
 
clone.querySelector(".post-title").innerHTML =
post.title.rendered;
 
const excerpt = post.excerpt.rendered
.replace(/\[.*?\]/g,"")
.replace(/<[^>]*>/g,"");
 
clone.querySelector(".post-excerpt").innerText = excerpt;
 
clone.querySelector(".post-link").href=
`blog-details.html?id=${post.id}`;
 
container.appendChild(clone);
 
});
 
});
 
 
/* EXPLORE BY TOPIC */
 
fetch(`${domain}/categories`)
.then(res => res.json())
.then(categories => {
 
const container = document.getElementById("topicsGrid");
const template = document.getElementById("topicTemplate");
 
container.innerHTML = "";
 
const topicOrder = [
"Prayer",
"Faith",
"Hope",
"Bible Study",
"Christian Living",
"Devotions"
];
 
/* sort categories */
 
categories = categories
.filter(cat => topicOrder.includes(cat.name))
.sort((a,b)=> topicOrder.indexOf(a.name) - topicOrder.indexOf(b.name));
 
categories.forEach((cat,index)=>{
 
if(cat.acf && cat.acf.category_image){
 
fetch(`${domain}/media/${cat.acf.category_image}`)
.then(res => res.json())
.then(media => {
 
const clone = template.content.cloneNode(true);
 
const card = clone.querySelector(".topic-card");
 
clone.querySelector(".topic-image").src = media.source_url;
clone.querySelector(".topic-title").innerText = cat.name;
 
card.href = `category.html?id=${cat.id}&name=${encodeURIComponent(cat.name)}`;
 
/* last row layout */
 
if(index === 4 || index === 5){
card.classList.add("md:col-span-2");
}
 
container.appendChild(clone);
 
});
 
}
 
});
 
});
 
/* LATEST ARTICLES */
 
fetch(`${domain}/posts?_embed&per_page=4`)
.then(res=>res.json())
.then(posts=>{
 
const container=document.getElementById("latestPosts");
const template=document.getElementById("latestTemplate");
 
posts.forEach(post=>{
 
const clone=template.content.cloneNode(true);
 
clone.querySelector(".latest-image").src=
post._embedded["wp:featuredmedia"][0].source_url;
 
clone.querySelector(".latest-category").innerText=
post._embedded["wp:term"][0][0].name;
 
clone.querySelector(".latest-title").innerHTML =
post.title.rendered;
 
clone.querySelector(".latest-excerpt").innerHTML=
post.excerpt.rendered;
 
clone.querySelector(".author span").innerText =
post._embedded["author"][0].name;
 
clone.querySelector(".date span").innerText =
new Date(post.date).toLocaleDateString();
 
clone.querySelector(".read-more").href=
`blog-details.html?id=${post.id}`;
 
container.appendChild(clone);
 
});
 
});
 