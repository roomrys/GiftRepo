
editItemsButton = document.getElementById("edit-items-button")
allEditVisible = Array.from(document.getElementsByClassName("edit"));
wall = document.getElementById('wall');
container = document.getElementById("container");
closeEditorClasses = ["header"];

document.addEventListener("click", event => {
    // console.log(Array.from(event.target.classList))
    let eventClassList = Array.from(event.target.classList);
   if (eventClassList.includes("button")) {
       if (eventClassList.some(v => closeEditorClasses.includes(v))) {
           openCloseEditor(false);
       }
        if (((event.target.id) === "edit-items-button") 
        || ((event.target.id) === "edit-items-box")) {
            allEditVisible.forEach( element => {
                element.classList.toggle("invisible");
            })
        }
        else if ((Array.from(event.target.classList).includes("cell-edit")) 
        || (Array.from(event.target.classList).includes("cell-edit-text"))) {
            openCloseEditor(true);
        }
    }
})

function openCloseEditor(isAdd) {
    if (isAdd) {
        wall.classList.remove("invisible");
        container.classList.add("blur");
    }
    else {
        wall.classList.add("invisible");
        container.classList.remove("blur");
    }

}