$('[data-toggle="popover"]').popover({
    html: true,
    content: function () {
        var content = $(this).data("popover-content");
        return $(content).children(".popover-body").html();
    },
});

/* Hacer html dinamico */

/* Obteniendo los datos del formulario */
const getUpgradeForm = () => {
    let date = new Date();

    console.log(date);
    // let upgrade = $("#upgrade-medium");
    // let upgradeArr = upgrade.serializeArray().forEach((dataUser) => {
    //     upgradeObject[dataUser.name] = dataUser.value;
    //     upgradeObject["newDate"] = date;
    // });
    // saveUpgrade(upgradeObject);
    // $("#saveModal").modal("hide");
};

  /* Eventos */

$("#save-article").click(function(){
    window.location = '../formulario.html';
});

$("#toIndex").click(function(){
    window.location = '../index.html';
});