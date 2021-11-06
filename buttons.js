
// for edit button
let editItemsButton = document.getElementById("edit-items-button")
let allEditVisible = Array.from(document.getElementsByClassName("edit"));
let allLinksDisable = document.querySelectorAll("a.cell-link");
// console.log(allLinksDisable);

// for wall (for edit popup)
let wall = document.getElementById('wall');
let closeEditorClasses = ["header", "edit-popup"];
let container = document.getElementById("container");

// for edit popup
let editPopup = {
    title: document.getElementById("title-edit-popup"),

    manualEntry: {
        cell: document.getElementById("manual-entry-cell"),
        title: function() {
            return this.cell.querySelector(".cell-title")
        },
        price: function() {
            return this.cell.querySelector(".cell-price")
        },
        image: function() {
            return this.cell.querySelector(".cell-image")
        },
        link: function() {
            return this.cell.querySelector(".cell-link")
        }
    },

    autoEntry: {
        title:  document.getElementById("title-auto-entry"),
        link: document.getElementById("link-auto-entry")
    }
}

// let titleEditEntry = document.getElementById("title-edit-popup");
// let titleAutoEntry = document.getElementById("title-auto-entry");
// let linkAutoEntry = document.getElementById("link-auto-entry");
// let manualEntryCell = document.getElementById("manual-entry-cell");
// let priceManualEntry = manualEntryCell.querySelector(".cell-price");
// let titleManualEntry = manualEntryCell.querySelector(".cell-title");
// let imageManualEntry = manualEntryCell.querySelector(".cell-image");

// handles all click events
document.addEventListener("click", event => {
    let eventClassList = Array.from(event.target.classList);
    let eventId = event.target.id;
    // console.log(eventId);
    // console.log(eventClassList);
   if (eventClassList.includes("button")) { // check if clicked a button
       if (eventClassList.some(v => closeEditorClasses.includes(v))) { 
           // close editor
           openCloseEditor(false);
       }
        if (["edit-items-button", "edit-items-box"].includes(eventId)) { 
            // hide/unhide delete and edit buttons
            toggleEditDelete();
        }
        else if (eventClassList.includes("cell-edit")) { 
            // open editor and load cell
            openCloseEditor(true);
            editPopup.title.innerHTML = "Edit Entry";
            editId = event.target.parentNode.id;  // global variable for editId
            editEditPopup(editId); // edit-popup
        }
        else if (eventId === "save-edit-popup") {
            // edit grid item after saving editor popup
            newTitle = editPopup.manualEntry.title().value;
            newPrice = editPopup.manualEntry.price().value;
            newLink = editPopup.autoEntry.link.value;
            newImg = editPopup.manualEntry.image().src;
            editGridItem(editId, newTitle, newPrice, newLink, newImg)
        }
        else if (eventClassList.some(classFromList => 
                ["cell-delete", "cell-delete-img"].includes(classFromList))) {
            // deletes cell if hit delete button
            deleteCell(event.target.parentNode.parentNode.id);
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
    allLinksDisable.forEach( element => {
        element.classList.toggle("disabled-link");
    });
}