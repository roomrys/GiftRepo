
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
        },
        updateTitle: function(newTitle) {
            editPopup.manualEntry.title().value = newTitle;
        },
        updateImage: function() {
            editPopup.manualEntry.image().src = URL.createObjectURL(editPopup.manualEntry.link().files[0])}
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
    },

    edit: function(gridId=gridItem.selectId) {
        let cell = document.getElementById(gridId);
    
        let title = cell.querySelector(".cell-title");
        editPopup.autoEntry.title.value = title.innerHTML;
        editPopup.manualEntry.title().value = title.innerHTML;
    
        let price = cell.querySelector(".cell-price");
        editPopup.manualEntry.price().value = price.innerHTML;
    
        let link = cell.querySelector(".cell-link");
        editPopup.autoEntry.link.value = link.href;
    
        let cellImg = cell.querySelector(".cell-image");
        editPopup.manualEntry.image().src = cellImg.src;
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
           editItems.visibility.toggle(false);
       }
        if (editItems.identityList.includes(eventId)) { 
            // hide/unhide delete and edit buttons
            editItems.visibility.toggle();
        }
        else if (eventClassList.includes("cell-edit")) { 
            // open editor and load cell
            editPopup.visibility.toggle(true);
            gridItem.selectId = event.target.parentNode.id;  // global variable for editId
            // editId = event.target.parentNode.id;  // global variable for editId
            editPopup.edit(); // edit-popup
        }
        else if (eventId === "save-edit-popup") {
            // edit grid item after saving editor popup
            let newTitle = editPopup.manualEntry.title().value;
            let newPrice = editPopup.manualEntry.price().value;
            let newLink = editPopup.autoEntry.link.value;
            let newImg = editPopup.manualEntry.image().src;
            gridItem.edit(newTitle, newPrice, newLink, newImg)
        }
        else if (eventClassList.some(classFromList => 
                ["cell-delete", "cell-delete-img"].includes(classFromList))) {
            // deletes cell if hit delete button
            gridItem.deleteCell(event.target.parentNode.parentNode.id);
        }
    }
})