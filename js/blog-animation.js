gsap.registerPlugin(ScrollTrigger);

function initBlogAnimations() {
  const cards = document.querySelectorAll('.topic-card');
  
  if (cards.length > 0) {
    cards.forEach((card, index) => {
      // We calculate a unique start point for each card
      // This creates the "one-by-one" effect even when scrubbing
      const delay = index * 150; // Increases the scroll distance needed for each card

      gsap.fromTo(card, 
        { 
          opacity: 0, 
          y: 230,        // Start deep
          scale: 0.8, 
          rotationX: -15 
        }, 
        {
          opacity: 1, 
          y: 0,          // End at natural position
          scale: 1, 
          rotationX: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            // '+=100' means start 100px AFTER the card hits the bottom
            // adding index * 50 makes card 2 start 50px after card 1, and so on.
            start: `top bottom-=${index * 80}`, 
            end: `top center+=${index * 40}`,
            scrub: 1.2, // Smooth follow-the-scroll
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    // Elegant Image Parallax (Inner Zoom)
    document.querySelectorAll('.topic-image').forEach(img => {
      gsap.fromTo(img, 
        { scale: 1.5 }, 
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom", 
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  }

  // Header Animation
  gsap.from("#explore h2, #explore p", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#explore",
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    }
  });
  gsap.set("#featuredCard, .blog-grid-card", { 
        opacity: 0, 
        visibility: "visible",
        willChange: "transform, opacity" 
    });

    // 2. FEATURED BLOG: Cinematic Slide from Left
    const featured = document.querySelector("#featuredCard");
    if (featured) {
        gsap.fromTo(featured, 
            { 
                opacity: 0, 
                x: -100, 
                scale: 0.9 
            }, 
            {
                opacity: 1, 
                x: 0, 
                scale: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: featured,
                    start: "top 85%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );
    }

    // 3. BLOG GRID: One-by-One Rising (Bottom to Top)
    const gridCards = document.querySelectorAll(".blog-grid-card");
    if (gridCards.length > 0) {
        gridCards.forEach((card, index) => {
            // Calculate a staggered start point based on index
            // This ensures they don't all come up at once
            const columnOffset = (index % 3) * 100; 

            gsap.fromTo(card, 
                { 
                    opacity: 0, 
                    y: 230,      // Start deep
                    scale: 0.85 
                }, 
                {
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        // This calculation makes the 2nd and 3rd cards wait for more scroll
                        start: `top bottom-=${columnOffset}`, 
                        end: "top 60%",
                        scrub: 1.2, // Perfectly follows scroll up and down
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });
    }

    // 4. IMAGE PARALLAX: Zooming within the cards
    const images = document.querySelectorAll(".blog-grid-card img, #featuredCard img");
    images.forEach(img => {
        gsap.fromTo(img, 
           
            {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    });

  ScrollTrigger.refresh();
}