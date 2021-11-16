// handles all click events
document.addEventListener("click", event => {
    let eventClassList = Array.from(event.target.classList);
    let eventId = event.target.id;
    // console.log(eventId);
    // console.log(eventClassList);
   if (eventClassList.includes("button")) { // check if clicked a button
       if (eventClassList.some(v => editPopup.visibility.closeEditorClassList.includes(v))) { 
           // close editor
           editPopup.visibility.toggle(false);
       }

        if (editItems.identityList.includes(eventId)) { 
            // hide/unhide delete and edit buttons
            editItems.visibility.toggle();
        }
        else if (eventClassList.includes("cell-edit")) { 
            // open editor and load cell
            editPopup.isEdit = true;
            editPopup.visibility.toggle(true);
            gridItem.selectId = event.target.parentNode.id;
            editPopup.edit(gridItem.selectId); // edit-popup
        }
        else if (eventId === "new-entry-cell") {
            editPopup.isEdit = false;
            gridItem.selectId = event.target.id; 
            editPopup.visibility.toggle(true);
            editPopup.edit()
        }
        else if (eventId === "save-edit-popup") {
            // edit grid item after saving editor popup
            editPopup.save()
        }
        else if (eventClassList.some(classFromList => 
                ["cell-delete", "cell-delete-img"].includes(classFromList))) {
            // deletes cell if hit delete button
            gridItem.deleteCell(event.target.parentNode.parentNode.id);
        }
    }
})