var dictArray = [];
var defaultDict = {img: './svg/present.svg', price:'$888'};
for (let i = 0; i<11; i++) {
    dictArray[i] = {...defaultDict, title: "Title " + i}
}

create_grid(dictArray)
createCell(dictArray[0], document.getElementById("container"))

function create_grid(dictArray, cols=3) {
    const container = document.getElementById("container");
    let numItems = dictArray.length;

    container.style.setProperty('--grid-rows', Math.ceil(numItems / cols));
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < numItems; c++) {
        createCell(dictArray[c], container)
    };
}

function createCell(dict, container, func=this.appendChild) {
        console.log(this)

        var cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";

        var cellDelete = document.createElement("div");
        cell.appendChild(cellDelete).className = "cell-delete button edit invisible";

        var cellDeleteImg = document.createElement("img");
        cellDeleteImg.src = './svg/trashcan.svg';
        cellDelete.appendChild(cellDeleteImg).className = "cell-delete-img img button edit invisible";

        var cellEdit = document.createElement("div");
        cell.appendChild(cellEdit).className = "cell-edit button edit invisible";
        
        var cellEditText = document.createElement("div");
        cellEditText.innerHTML = "Edit";
        cellEdit.appendChild(cellEditText).className = "cell-edit-text button edit invisible";

        var link = document.createElement("a");
        link.href="https://css-tricks.com/snippets/css/complete-guide-grid/"
        cell.appendChild(link).classList = "cell-link";

        var cellImg = document.createElement("img");
        cellImg.src = dict['img'];
        link.appendChild(cellImg).className = "cell-image";

        var title = document.createElement("div");
        title.innerHTML = dict['title'];
        cell.appendChild(title).className = "cell-title title";

        var price = document.createElement("div");
        price.innerText = dict['price'];
        cell.appendChild.className = "cell-price price";
}