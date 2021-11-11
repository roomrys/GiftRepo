
// for edit button
let editItems = {
    button: document.getElementById("edit-items-button"),

    identityList: ["edit-items-button", "edit-items-box"], 

    visibility: {
        toggleElementsList: Array.from(document.getElementsByClassName("edit")),
        toggleLinksList: document.querySelectorAll("a.cell-link"),
        status: false,
        toggle: function(isVisible= !(this.status), button=editItems.button) {
            this.status = isVisible;
            let addOrRemove = function(element, classToAddOrRemove) {
                isVisible?element.classList.remove(classToAddOrRemove):element.classList.add(classToAddOrRemove);
            };
            this.toggleElementsList.forEach( element => {
                addOrRemove(element, "invisible");
            })
            this.toggleLinksList.forEach( element => {
                addOrRemove(element, "disabled-link");
            })
            isVisible?(button.innerHTML = "Exit Edit"):(button.innerHTML = "Edit Items");
        }
    }
}

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
    },

    visibility: {
        wall: document.getElementById('wall'),
        container: document.getElementById("container"),
        closeEditorClassList: ["header", "edit-popup"],
        status: false,
        toggle: function (isOpen=this.status) {
            this.status = isOpen;
            if (this.status) {
                this.wall.classList.remove("invisible");
                this.container.classList.add("blur");
            }
            else {
                this.wall.classList.add("invisible");
                this.container.classList.remove("blur");
            }
        }
    }
}

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
            editPopup.visibility.toggle(true);
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