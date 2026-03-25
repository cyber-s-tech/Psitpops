window.addEventListener("load", () => {

  gsap.registerPlugin(ScrollTrigger);

  /* =========================
     INTRO LOGO ANIMATION
  ========================= */
  const introLogo = document.getElementById("introLogo");
  const headerLogo = document.getElementById("logoTarget");
  const overlay = document.getElementById("introOverlay");

  document.body.style.overflow = "hidden";

  if (introLogo && headerLogo) {
    const introRect = introLogo.getBoundingClientRect();
    const headerRect = headerLogo.getBoundingClientRect();

    const deltaX =
      headerRect.left +
      headerRect.width / 2 -
      (introRect.left + introRect.width / 2);

    const deltaY =
      headerRect.top +
      headerRect.height / 2 -
      (introRect.top + introRect.height / 2);

    const scaleRatio = headerRect.width / introRect.width;

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    tl.to(introLogo, {
      x: deltaX,
      y: deltaY,
      scale: scaleRatio,
      duration: 1.6
    })
      .to(introLogo, { opacity: 0, duration: 0.3 })
      .set(overlay, { display: "none" })
      .set(headerLogo, { opacity: 1 })

      .call(() => {
        startTyping();
        initScrollReveal(); // 🔥 start reveal after intro
      })

      .call(() => {
        document.body.style.overflow = "";
      });

  } else {
    startTyping();
    initScrollReveal();
  }

  /* =========================
     TYPING CORE
  ========================= */
  function typeText(element, speed = 0.04, startDelay = 0) {
    const text = element.textContent.trim();

    if (element.dataset.typed) return 0;
    element.dataset.typed = "true";

    element.textContent = "";

    const chars = text.split("");

    chars.forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = 0;
      element.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        duration: 0.05,
        delay: startDelay + i * speed,
        ease: "power1.out"
      });
    });

    return chars.length * speed;
  }

  function runTyping(lines) {
    let totalDelay = 0;

    lines.forEach(line => {
      const duration = typeText(line, 0.05, totalDelay);
      totalDelay += duration + 0.3;
    });
  }

  function startTyping(scope = document) {

  const blocks = scope.querySelectorAll("#heroTitle, .gsap-typing");

  // 👉 hide only reusable typing blocks (not hero)
  gsap.set(".gsap-typing", { opacity: 0 });

  blocks.forEach(block => {
    const lines = block.querySelectorAll(".typing-text");

    if (!lines.length) return;

    // ✅ HERO → normal typing (no fade)
    if (block.id === "heroTitle") {
      runTyping(lines);
      return;
    }

    // ✅ OTHER SECTIONS → fade + typing on scroll
    ScrollTrigger.create({
      trigger: block,
      start: "top 80%",
      once: true,
      onEnter: () => {

        // 🔥 fade in first
        gsap.to(block, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        });

        // 🔥 then typing
        runTyping(lines);
      }
    });
  });
}

  /* =========================
     SCROLL REVEAL + REVERSE
  ========================= */
  function initScrollReveal() {

  const base = {
    opacity: 0,
    duration: 1.8,          // ⬅ slower
    ease: "power4.out"      // ⬅ smoother easing
  };

  // 🔹 UP reveal (soft float)
  gsap.utils.toArray(".reveal-up").forEach(el => {
    gsap.fromTo(el,
      { y: 120, opacity: 0 },   // ⬅ more distance = softer feel
      {
        ...base,
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",     // ⬅ starts earlier (smooth entry)
          end: "top 40%",
          scrub: 1.2            // ⬅ smooth reverse (VERY IMPORTANT)
        }
      }
    );
  });

  // 🔹 LEFT reveal
  gsap.utils.toArray(".reveal-left").forEach(el => {
    gsap.fromTo(el,
      { x: -140, opacity: 0 },
      {
        ...base,
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 40%",
          scrub: 1.2
        }
      }
    );
  });

  // 🔹 RIGHT reveal
  gsap.utils.toArray(".reveal-right").forEach(el => {
    gsap.fromTo(el,
      { x: 140, opacity: 0 },
      {
        ...base,
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 40%",
          scrub: 1.2
        }
      }
    );
  });

}

});