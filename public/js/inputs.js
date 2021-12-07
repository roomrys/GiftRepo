document.addEventListener('input', event => {
    let eventClassList = Array.from(event.target.classList);
    let eventId = event.target.id;
    // console.log(event);
    // console.log(eventClassList);
    // console.log(eventId);
    if (eventClassList.includes("cell-link")) {
        editPopup.manualEntry.updateImage();
    }
    else if (eventId === "title-auto-entry") {
        editPopup.manualEntry.updateTitle(event.target.value);
    }
    else if (eventId === "link-auto-entry") {
        editPopup.loader.classList.remove('invisible');
        editPopup.autoEntry.webScrape(editPopup.autoEntry.link.value, 
            function(resWebScraper) {
                editPopup.autoEntry.updateEntry(resWebScraper);
                editPopup.loader.classList.add('invisible')
            });
    }
});