const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

$(".url-input").on("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        jQuery(".shorten-btn").click();
    }
});

jQuery(".shorten-btn").on("click", function () {
    let full = jQuery(".url-input").val();

    jQuery.ajax({
        type: "POST",
        url: "/shorten",

        data: JSON.stringify({ url: full }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            jQuery(".url-input").val(window.location.origin + "/" + res.short);
            jQuery(".url-input").attr("readonly", true);
            jQuery(".url-input").addClass("is-link");
            jQuery(".url-input").on("click", function () {
                location.href = jQuery(".url-input").val();
            });

            jQuery("label[for='url-input']").css({ width: "85%" });
            jQuery(".shorten-btn").html("Copy");
            jQuery(".shorten-btn").on("click", function () {
                copyToClipboard(jQuery(".url-input").val());
                location.href = location.href;
            });
        },
        error: function (err) {
            console.error(err);
        },
    });
});
