$(".url-input").on("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        $(".shorten-btn").click();
    }
});

$(".shorten-btn").on("click", function (e) {
    let full = $(".url-input").val();

    if (!validURL(full)) {
        $(".terminal-container").effect("shake");
    } else {
        $.ajax({
            type: "POST",
            url: "/shorten",

            data: JSON.stringify({ url: full }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                $(".url-input").val(window.location.origin + "/" + res.short);
                $(".url-input").attr("readonly", true);
                $(".url-input").addClass("is-link");
                $(".url-input").on("click", function () {
                    location.href = $(".url-input").val();
                });

                $("label[for='url-input']").css({ width: "85%" });
                $(".shorten-btn").html("Copy");
                $(".shorten-btn").on("click", function () {
                    copyToClipboard($(".url-input").val());
                    location.href = location.href;
                });
            },
            error: function (err) {
                console.error(err);
            },
        });
    }
    $(e.target).blur();
});

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
