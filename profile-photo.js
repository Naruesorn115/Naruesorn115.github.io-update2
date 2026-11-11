document.querySelectorAll(".profile-img").forEach((image) => {
    const preview = document.createElement("dialog");
    preview.className = "profile-preview";
    preview.setAttribute("aria-label", "รูปโปรไฟล์ขนาดใหญ่");

    const closePreview = document.createElement("button");
    closePreview.className = "profile-preview-close";
    closePreview.type = "button";
    closePreview.textContent = "ปิด";
    closePreview.setAttribute("aria-label", "ปิดรูปโปรไฟล์");

    const previewImage = document.createElement("img");
    previewImage.alt = "รูปโปรไฟล์ขนาดใหญ่";
    preview.append(closePreview, previewImage);

    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", "กดเพื่อดูรูปโปรไฟล์ขนาดใหญ่");

    const openPreview = () => {
        previewImage.src = image.src;
        preview.showModal();
        closePreview.focus();
    };

    image.addEventListener("click", openPreview);
    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPreview();
        }
    });
    closePreview.addEventListener("click", () => preview.close());
    preview.addEventListener("cancel", () => preview.close());
    preview.addEventListener("click", (event) => {
        if (event.target === preview) preview.close();
    });
    preview.addEventListener("close", () => image.focus());

    const fallbackPhoto = `data:image/svg+xml,${encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#c4b5fd"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs><rect width="160" height="160" fill="url(#g)"/><circle cx="80" cy="61" r="29" fill="#fff" fill-opacity=".92"/><path d="M25 160c3-34 25-53 55-53s52 19 55 53" fill="#fff" fill-opacity=".92"/></svg>'
    )}`;
    const showFallback = () => {
        image.removeEventListener("error", showFallback);
        image.src = fallbackPhoto;
    };
    image.addEventListener("error", showFallback);
    document.body.appendChild(preview);

    if (image.complete && image.naturalWidth === 0) showFallback();
});

const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".navbar a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
    }
});
