const selecttedTextArea = document.querySelector(".selected-text-area");
const twitterBtn=document.querySelector("#twitterPublish");

selecttedTextArea.addEventListener("mouseup", selectedTextAreaOnMouseUp);
function selectedTextAreaOnMouseUp(e){
    setTimeout(() => {
        const selectedText = window.getSelection().toString().trim();
    if(selectedText.length){
        twitterBtn.style.left = `${e.pageX + Number(getComputedStyle(twitterBtn).width.slice(0,-5))}px`;
        twitterBtn.style.top = `${e.pageY - Number(getComputedStyle(twitterBtn).height.slice(0,-2))}px`;  
        twitterBtn.style.display="block";
        twitterBtn.classList.add("twitterBtnAnimation");
    }
    }, 0)
}

    document.addEventListener("mousedown",(event) =>{
        if(getComputedStyle(twitterBtn).display === "block" && event.target.id !== "twitterPublish"){
            twitterBtn.style.display = "none";
            twitterBtn.classList.remove("twitterBtnAnimation");
            window.getSelection().empty();
        }
    });

    twitterBtn.addEventListener("click",twitterShareBtnClick);
    function twitterShareBtnClick(){
        const twitterShareLink = 'https://twitter.com/intent/tweet';
        const text = encodeURIComponent(window.getSelection().toString().trim());
        const hashtags ="programming, JavaScript";
        const via= 'ProgrammersSchool';
        window.open(`${twitterShareLink}?text="${text}" by @${via} ${hashtags.split(", ").map(h => "%23" +h).join(" ")} ${encodeURIComponent(window.location.href)}`);
    }
