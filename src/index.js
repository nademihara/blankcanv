const album = document.querySelector("#wip-album");
const folder = album.querySelector("#wip-folder");
const folderBack = folder.querySelector(".folder-back");
const folderFront = folder.querySelector(".folder-front");
const photoStack = folder.querySelector(".paper-stack");
const photoButtons = [...photoStack.querySelectorAll(".paper")];
const photoViewer = document.querySelector("#photo-viewer");
const viewerImage = document.querySelector("#viewer-image");
const viewerCount = document.querySelector("#viewer-count");
const viewerTitle = document.querySelector("#viewer-title");
const viewerDescription = document.querySelector("#viewer-description");
const siteHeader = document.querySelector(".site-header");
let activePhotoIndex = 0;
let previousScrollY = window.scrollY;
let accumulatedScrollDelta = 0;
let headerIsland = false;
let scrollFramePending = false;

function setHeaderIsland(shouldFloat) {
  if (headerIsland === shouldFloat) return;
  headerIsland = shouldFloat;
  siteHeader.classList.toggle("island", shouldFloat);
}

function setAlbumOpen(isOpen) {
  folder.classList.toggle("open", isOpen);
  folderFront.setAttribute("aria-expanded", String(isOpen));
  folderFront.setAttribute("aria-label", isOpen ? "Tutup album foto" : "Buka album foto");
  photoStack.setAttribute("aria-hidden", String(!isOpen));
  photoStack.toggleAttribute("inert", !isOpen);
}

function toggleAlbum() {
  setAlbumOpen(folderFront.getAttribute("aria-expanded") !== "true");
}

function showPhoto(index) {
  activePhotoIndex = (index + photoButtons.length) % photoButtons.length;
  const photoButton = photoButtons[activePhotoIndex];
  const image = photoButton.querySelector("img");

  viewerImage.src = image.currentSrc || image.src;
  viewerImage.alt = image.alt;
  viewerTitle.textContent = photoButton.dataset.title;
  viewerDescription.textContent = photoButton.dataset.description;
  viewerCount.textContent = `${activePhotoIndex + 1} / ${photoButtons.length}`;
}

folderFront.addEventListener("click", toggleAlbum);
folder.addEventListener("click", (event) => {
  if (event.target === folder || event.target === folderBack) {
    toggleAlbum();
  }
});
photoButtons.forEach((photoButton, index) => {
  photoButton.addEventListener("click", () => {
    showPhoto(index);
    photoViewer.showModal();
  });
});

document.querySelector(".viewer-close").addEventListener("click", () => {
  photoViewer.close();
});

document.querySelector("#viewer-previous").addEventListener("click", () => {
  showPhoto(activePhotoIndex - 1);
});

document.querySelector("#viewer-next").addEventListener("click", () => {
  showPhoto(activePhotoIndex + 1);
});

photoViewer.addEventListener("click", (event) => {
  if (event.target === photoViewer) {
    photoViewer.close();
  }
});

photoViewer.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    photoViewer.close();
  }
});

photoViewer.addEventListener("close", () => {
  photoButtons[activePhotoIndex].focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !photoViewer.open && folder.classList.contains("open")) {
    setAlbumOpen(false);
    folderFront.focus();
  }
});

function updateHeaderFromScroll() {
  scrollFramePending = false;

  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - previousScrollY;
  previousScrollY = currentScrollY;

  if (currentScrollY <= 24) {
    accumulatedScrollDelta = 0;
    setHeaderIsland(false);
    return;
  }

  if (Math.sign(scrollDelta) !== Math.sign(accumulatedScrollDelta)) {
    accumulatedScrollDelta = scrollDelta;
  } else {
    accumulatedScrollDelta += scrollDelta;
  }

  if (accumulatedScrollDelta >= 12) {
    setHeaderIsland(true);
    accumulatedScrollDelta = 0;
  } else if (accumulatedScrollDelta <= -12) {
    setHeaderIsland(false);
    accumulatedScrollDelta = 0;
  }
}

// Di-coalesce per frame (rAF) biar nggak nge-layout tiap event scroll,
// dan class `island` cuma disentuh kalau state-nya beneran berubah.
window.addEventListener("scroll", () => {
  if (scrollFramePending) return;
  scrollFramePending = true;
  requestAnimationFrame(updateHeaderFromScroll);
}, { passive: true });