var actionValue =  '';
$('[data-toggle="popover"]').popover({
    html: true,
    content: function () {
        var content = $(this).data("popover-content");
        return $(content).children(".popover-body").html();
    },
});

$('.popover-show').on('click',function(e){
    e.preventDefault();
    actionValue = $(this).data('action-value');
    let cardPostContainer = $(`[data-post-id=${actionValue}]`).children();
    cardPostContainer.closest('.card-post-hide').removeClass('d-none');
    $('.popover-show').popover('hide')
})

$('.action-click').on('click',function(e){
    e.preventDefault();
    console.log('asdfghjk');
    alert();
})

$('.card-body-closed').click(function(){
    $(this).closest('#card-learn').remove();
})
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
}); //boton regresar