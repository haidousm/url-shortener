const urlInput = document.querySelector(".url-input");
const shortenBtn = document.querySelector(".shorten-btn");
window.onload = () => {
    urlInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            shortenBtn.click();
        }
    });
    shortenBtn.addEventListener("click", async (e) => {
        if (shortenBtn.innerHTML === "Copy") {
            copyToClipboard(urlInput.value);
            location.href = location.href;
            return;
        }

        const fullUrl = urlInput.value;
        if (!validURL(fullUrl)) {
            $(".terminal-container").effect("shake");
        } else {
            const res = await fetch("/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: fullUrl,
                }),
            });

            if (res.status === 200) {
                const data = await res.json();
                urlInput.value = window.location.origin + "/" + data.short;
                urlInput.attributes.readonly = true;

                urlInput.style.textDecoration = "underline";
                urlInput.style.cursor = "pointer";
                urlInput.addEventListener("click", () => {
                    location.href = urlInput.value;
                });

                shortenBtn.innerText = "Copy";
            }
        }

        e.target.blur();
    });
};

const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

const validURL = (str) => {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" +
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
            "((\\d{1,3}\\.){3}\\d{1,3}))" +
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
            "(\\?[;&a-z\\d%_.~+=-]*)?" +
            "(\\#[-a-z\\d_]*)?$",
        "i"
    );
    return !!pattern.test(str);
};

// const shake = (div, interval = 100, distance = 10, times = 4) => {
//     $(div).css("position", "relative");
//     for (var iter = 0; iter < times + 1; iter++) {
//         $(div).animate(
//             { left: iter % 2 == 0 ? distance : distance * -1 },
//             interval
//         );
//     }
//     $(div).animate({ left: 0 }, interval);
// };
