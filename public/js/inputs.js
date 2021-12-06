document.addEventListener('input', event => {
    let eventClassList = Array.from(event.target.classList);
    let eventId = event.target.id;
    console.log(event);
    console.log(eventClassList);
    console.log(eventId);
    if (eventClassList.includes("cell-link")) {
        editPopup.manualEntry.updateImage();
    }
    else if (eventId === "title-auto-entry") {
        editPopup.manualEntry.updateTitle(event.target.value);
    }
    else if (eventId === "link-auto-entry") {
        console.log(`link = ${editPopup.autoEntry.link.value}`);
        editPopup.autoEntry.webScrape(editPopup.autoEntry.link.value, 
            editPopup.autoEntry.updateEntry);
    }
});