/* Hacer html dinamico */

/* Obteniendo los datos del formulario */
const getUpgradeForm = () => {
    let date = new Date();
    console.log(date);
    let upgrade = $("#upgrade-medium");
    let upgradeArr = upgrade.serializeArray().forEach((dataUser) => {
        upgradeObject[dataUser.name] = dataUser.value;
        upgradeObject["newDate"] = date;
    });
    saveUpgrade(upgradeObject);
    $("#saveModal").modal("hide");
};

  /* Eventos */

$("#save-article").click(getUpgradeForm);
