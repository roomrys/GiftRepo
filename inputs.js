document.addEventListener('input', event => {
    let eventClassList = Array.from(event.target.classList);
    let eventId = event.target.id;
    // console.log(event);
    // console.log(eventClassList);
    // console.log(eventId);
    if (eventClassList.includes("cell-link")) {
        editPopup.manualEntry.image().src = URL.createObjectURL(editPopup.manualEntry.link().files[0]);
    }
    else if (eventId === "title-auto-entry") {
        editPopup.manualEntry.title().value = event.target.value;
    }
});

function updateManualEntryCellImage(cell) {
    let cellImg = cell.querySelector(".cell-image");
    cellImg.src = URL.createObjectURL(cell.querySelector(".cell-link").files[0]);
}