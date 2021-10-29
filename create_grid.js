create_grid(10)

function create_grid(numItems, cols=3) {
    const container = document.querySelector(".container");
    let rows = Math.ceil(numItems / cols);
    makeRows(rows, cols);

    function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    var lastChild = []
    for (c = 0; c < (rows * cols); c++) {

        var link = document.createElement("a");
        link.href="https://css-tricks.com/snippets/css/complete-guide-grid/"
        container.appendChild(link);

        var cell = document.createElement("div");
        link.appendChild(cell).className = "grid-item";

        var cellDelete = document.createElement("div");
        cell.appendChild(cellDelete).className = "cell-delete button";

        var cellDeleteImg = document.createElement("img");
        cellDeleteImg.src = './svg/trashcan.svg';
        console.log(cellDeleteImg)
        cellDelete.appendChild(cellDeleteImg).className = "cell-delete-img img button";

        var cellEdit = document.createElement("div");
        cell.appendChild(cellEdit).className = "cell-edit button";
        
        var cellEditText = document.createElement("div");
        cellEditText.innerHTML = "Edit";
        cellEdit.appendChild(cellEditText).className = "cell-edit-text";

        var cellImg = document.createElement("img");
        cellImg.src = './svg/present.svg'
        cell.appendChild(cellImg).className = "cell-image";

        var title = document.createElement("div");
        title.innerHTML = "Title " + c;
        cell.appendChild(title).className = "cell-title title";

        var price = document.createElement("div");
        price.innerText = "$888";
        cell.appendChild(price).className = "cell-price price"
    };
    };
}