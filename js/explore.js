async function initTopicsOnly() {
    const domain = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2";
    const container = document.getElementById("exploreTopics");
    const template = document.getElementById("exploreTemplate");

    if (!container || !template) return;

    try {

        const res = await fetch(`${domain}/categories`);
        let categories = await res.json();

        const topicOrder = [
            "Prayer",
            "Faith",
            "Hope",
            "Bible Study",
            
        ];

        categories = categories
            .filter(cat => topicOrder.includes(cat.name))
            .sort((a, b) => topicOrder.indexOf(a.name) - topicOrder.indexOf(b.name));

        container.innerHTML = "";

     for (const cat of categories) {

    const clone = template.content.cloneNode(true);
    const card = clone.querySelector(".topic-card");
    const img = clone.querySelector(".topic-image");

    clone.querySelector(".topic-title").innerText = cat.name;
    card.href = `category.html?id=${cat.id}&name=${encodeURIComponent(cat.name)}`;

    if (cat.acf && cat.acf.category_image) {
        try {
            const mediaRes = await fetch(`${domain}/media/${cat.acf.category_image}`);
            const media = await mediaRes.json();
            img.src = media.source_url;
        } catch (e) {
            img.src = "/images/default-topic.jpg";
        }
    } else {
        img.src = "/images/default-topic.jpg";
    }

    container.appendChild(clone);
}
        if (typeof initBlogAnimations === "function") {
            initBlogAnimations();
        }

    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

function initTopicSlider() {
    const container = document.getElementById("exploreTopics");
    const nextBtn = document.getElementById("topicsNext");
    const prevBtn = document.getElementById("topicsPrev");

    // If container isn't there yet, wait 100ms and try once more
    if (!container) {
        setTimeout(initTopicSlider, 100);
        return;
    }

    const scrollAmount = 326; 

    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.preventDefault();
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        };
    }

    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.preventDefault();
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        };
    }
}

