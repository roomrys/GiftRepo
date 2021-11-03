
let editItemsButton = document.getElementById("edit-items-button")
let allEditVisible = Array.from(document.getElementsByClassName("edit"));
let wall = document.getElementById('wall');
let container = document.getElementById("container");
let closeEditorClasses = ["header", "edit-popup"];
let titleEditEntry = document.getElementById("title-edit-popup");
let manualEntryCell = document.getElementById("manual-entry-cell");

document.addEventListener("click", event => {
    // console.log(Array.from(event.target.classList))
    let eventClassList = Array.from(event.target.classList);
    let eventId = event.target.id;
   if (eventClassList.includes("button")) { // check if clicked a button
       if (eventClassList.some(v => closeEditorClasses.includes(v))) { // close editor
           openCloseEditor(false);
       }
        if ((eventId === "edit-items-button") 
        || (eventId === "edit-items-box")) { // hide/unhide delete and edit buttons
            toggleEditDelete();
        }
        else if (eventClassList.includes("cell-edit")) { // open editor and load cell
            openCloseEditor(true);
            titleEditEntry.innerHTML = "Edit Entry";
            editId = event.target.parentNode.id;  // global variable for editId
        }
        else if (eventId === "save-edit-popup") {
            newTitle = manualEntryCell.querySelector(".cell-title").value;
            newPrice = manualEntryCell.querySelector(".cell-price").value;
            newLink = document.getElementById("link-auto-entry").value;
            newImg = manualEntryCell.querySelector(".cell-image").src;
            editGridItem(editId, newTitle, newPrice, newLink, newImg)
        }
    }
})

function openCloseEditor(isOpen) {
    if (isOpen) {
        wall.classList.remove("invisible");
        container.classList.add("blur");
    }
    else {
        wall.classList.add("invisible");
        container.classList.remove("blur");
    }

}

function toggleEditDelete() {
    allEditVisible.forEach( element => {
        element.classList.toggle("invisible");
    })
}