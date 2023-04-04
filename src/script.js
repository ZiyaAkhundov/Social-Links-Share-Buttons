const selecttedTextArea = document.querySelector(".selected-text-area");
const twitterBtn = document.querySelector("#twitterPublish");
const socialLinks = document.querySelector(".socialLinks");
const whatsappBtn = document.querySelector("#whatsappPublish");
const telegramBtn = document.querySelector("#telegramPublish");

selecttedTextArea.addEventListener("mouseup", selectedTextAreaOnMouseUp);
function selectedTextAreaOnMouseUp(e) {
    setTimeout(() => {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText.length) {
            socialLinks.style.left = `${e.pageX + Number(getComputedStyle(twitterBtn).width.slice(0, -5))}px`;
            socialLinks.style.top = `${e.pageY - Number(getComputedStyle(twitterBtn).height.slice(0, -2))}px`;
            socialLinks.style.display = "inline";
            twitterBtn.classList.add("BtnAnimation");
            whatsappBtn.classList.add("BtnAnimation");
            telegramBtn.classList.add("BtnAnimation");
            console.log(getComputedStyle(socialLinks).display)
        }
    }, 0)
}

document.addEventListener("mousedown", (event) => {
    if (getComputedStyle(socialLinks).display === "block" && !isClickInsideElement(event.target, socialLinks)) {
        socialLinks.style.display = "none";
        twitterBtn.classList.remove("BtnAnimation");
        whatsappBtn.classList.remove("BtnAnimation");
        telegramBtn.classList.remove("BtnAnimation");
        window.getSelection().empty();
    }
});
function isClickInsideElement(clickedElement, parentElement) {
    if (clickedElement === parentElement) {
        return true;
    } else if (clickedElement.parentNode) {
        return isClickInsideElement(clickedElement.parentNode, parentElement);
    } else {
        return false;
    }
}

twitterBtn.addEventListener("click", twitterShareBtnClick);
whatsappBtn.addEventListener("click", whatsappShareClick);
telegramBtn.addEventListener("click", telegramShareBtnClick);

function twitterShareBtnClick() {
    const twitterShareLink = 'https://twitter.com/intent/tweet';
    const hashtags = "programming, JavaScript";
    const text = encodeURIComponent(window.getSelection().toString().trim());
    const via = 'ProgrammersSchool';
    window.open(`${twitterShareLink}?text="${text}" by @${via} ${hashtags.split(", ").map(h => "%23" + h).join(" ")} ${encodeURIComponent(window.location.href)}`);
}

function whatsappShareClick() {
    const text = encodeURIComponent(window.getSelection().toString().trim());
    window.open(`https://api.whatsapp.com/send?text=${text + " shared by"}%20${encodeURIComponent(window.location.href)}`);
}

function telegramShareBtnClick() {
    const text = encodeURIComponent(window.getSelection().toString().trim());
    window.open(`https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`);
}
