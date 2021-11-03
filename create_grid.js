let dictArray = [];
let defaultDict = {img: './svg/present.svg', price:'$888', link:'https://codepen.io/sosuke/pen/Pjoqqp'};
for (let i = 0; i<11; i++) {
    dictArray[i] = {...defaultDict, title: "Title " + i}
}

create_grid(dictArray);
createCellInsertArray(dictArray, dictArray[0], document.getElementById("manual-entry"), true, false, true, "manual-entry-cell");

createCellInsertArray(dictArray, dictArray[0], document.getElementById("container"));

function create_grid(dictArray, cols=3) {
    const container = document.getElementById("container");
    let numItems = dictArray.length;

    container.style.setProperty('--grid-rows', Math.ceil(numItems / cols));
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < numItems; c++) {
        createCell(dictArray[c], container, true)
    };
}

function appendOrInsert(isAppend, parentNode, newNode, refNode=newNode) {
    return isAppend?parentNode.appendChild(newNode):parentNode.insertBefore(newNode, refNode);
}

function createCellInsertArray(dictArray, newDict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1") {
    createCell(newDict, container, isAppend, isDeletable, hasInput, idd);
    return isAppend?dictArray.push(newDict):dictArray.unshift(newDict);
}

function createCell(dict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1") {
    var cell = document.createElement("div");
    if (idd !== "-1") {
        cell.id = idd;
    }
    appendOrInsert(isAppend, container, cell, container.firstChild).className = "grid-item";

    if (isDeletable) {
        var cellDelete = document.createElement("div");
        cell.appendChild(cellDelete).className = "cell-delete button edit invisible";

        var cellDeleteImg = document.createElement("img");
        cellDeleteImg.src = './svg/trashcan.svg';
        cellDelete.appendChild(cellDeleteImg).className = "cell-delete-img img button edit invisible";

        var cellEdit = document.createElement("div");
        cellEdit.innerHTML = "Edit";
        cell.appendChild(cellEdit).className = "cell-edit text-button button edit invisible";
    }

    if (hasInput) {
        var link = document.createElement("input");
        link.type = "file";
        link.accept = ".jpg,.jpg,.gif,.png";
        link.style = "opacity: 0";
        cell.appendChild(link).classList = "cell-link";

        var cellImg = document.createElement("img");
        cellImg.src = dict['img'];
        cell.appendChild(cellImg).className = "cell-image img";
    }
    else {
        var link = document.createElement("a");
        link.href = dict['link'];
        cell.appendChild(link).classList = "cell-link";

        var cellImg = document.createElement("img");
        cellImg.src = dict['img'];
        link.appendChild(cellImg).className = "cell-image img";
    }

    if (hasInput) {
        var titleInput = document.createElement("input");
        titleInput.value = dict['title'];
        cell.appendChild(titleInput).className = "cell-title title";

        var price = document.createElement("input");
        price.value = dict['price'];
        cell.appendChild(price).className = "cell-price price";
    }
    else {
        var title = document.createElement("div");
        title.innerHTML = dict['title'];
        cell.appendChild(title).className = "cell-title title";

        var price = document.createElement("div");
        price.innerText = dict['price'];
        cell.appendChild(price).className = "cell-price price";
    }
}
