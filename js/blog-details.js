const domain = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2";

const params = new URLSearchParams(window.location.search);

const postId = params.get("id");

fetch(`${domain}/posts/${postId}?_embed`)
.then(res => res.json())
.then(post => {

document.getElementById("blogTitle").innerHTML = post.title.rendered;

if(post._embedded["wp:featuredmedia"]){
document.getElementById("blogImage").src =
post._embedded["wp:featuredmedia"][0].source_url;
}

document.getElementById("blogContent").innerHTML = post.content.rendered;

});