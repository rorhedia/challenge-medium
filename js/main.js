$('[data-toggle="popover"]').popover({
    html: true,
    content: function () {
        var content = $(this).data("popover-content");
        return $(content).children(".popover-body").html();
    },
});