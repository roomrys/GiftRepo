
editItemsButton = document.getElementById("edit-items-button")
allEditVisible = Array.from(document.getElementsByClassName("edit"));
wall = document.getElementById('wall');
container = document.getElementById("container");
closeEditorClasses = ["header", "edit-popup"];

document.addEventListener("click", event => {
    // console.log(Array.from(event.target.classList))
    let eventClassList = Array.from(event.target.classList);
   if (eventClassList.includes("button")) { // check if clicked button
       if (eventClassList.some(v => closeEditorClasses.includes(v))) { // close editor
           openCloseEditor(false);
       }
        if (((event.target.id) === "edit-items-button") 
        || ((event.target.id) === "edit-items-box")) { // hide/unhide delete and edit buttons
            toggleEditDelete();
        }
        else if ((Array.from(event.target.classList).includes("cell-edit"))) { // open editor and load cell
            openCloseEditor(true);
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