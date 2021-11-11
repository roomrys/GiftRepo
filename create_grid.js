let dictArray = {
    defaultDict: {img: './svg/present.svg', 
        price:'$888', 
        link:'https://codepen.io/sosuke/pen/Pjoqqp'},

    getArr: function() { // pull this value from database
        let array = [];
        for (let i = 0; i<11; i++) {
            array[i] = {...dictArray.defaultDict, title: "Title " + i}
        };
        return array
    },

    edit(gridId, dictArr) {
        let cell = document.getElementById(gridId);
        let cellTitle = cell.querySelector(".cell-title");
        let cellPrice = cell.querySelector(".cell-price");
        let cellLink = cell.querySelector(".cell-link");
        let cellImg = cell.querySelector(".cell-image");
    
        dictArr[gridId] = {...dictArr[gridId],
            title: cellTitle.innerHTML,
            price: cellPrice.innerHTML,
            link: cellLink.href,
            img: cellImg.src
        }
    },

    deleteCell(gridId, dictArr) {
        dictArr.splice(gridId, 1);
        grid.updateGridIds();
        console.log(dictArr);
    }
}

let dArray = dictArray.getArr();

let gridItem =  {

    selectId: -1, //default: item not selected

    appendOrInsert: function(isAppend, parentNode, newNode, refNode=newNode) {
        return isAppend?parentNode.appendChild(newNode):parentNode.insertBefore(newNode, refNode);
    },

    createCell: function(dict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1") {
        let cell = document.createElement("div");
        if (idd !== "-1") {
            cell.id = idd;
        }
        gridItem.appendOrInsert(isAppend, container, cell, container.firstChild).className = "grid-item";
    
        if (isDeletable) {
            let cellDelete = document.createElement("div");
            cell.appendChild(cellDelete).className = "cell-delete button edit invisible";
    
            let cellDeleteImg = document.createElement("img");
            cellDeleteImg.src = './svg/trashcan.svg';
            cellDelete.appendChild(cellDeleteImg).className = "cell-delete-img img button edit invisible";
    
            let cellEdit = document.createElement("div");
            cellEdit.innerHTML = "Edit";
            cell.appendChild(cellEdit).className = "cell-edit text-button button edit invisible";
        }
    
        if (hasInput) {
            let cellImg = document.createElement("img");
            cellImg.src = dict['img'];
            cell.appendChild(cellImg).className = "cell-image img";
    
            let link = document.createElement("input");
            link.type = "file";
            link.accept = ".jpg,.jpg,.gif,.png,.svg";
            link.style = "opacity: 0";
            // cell.oninput = updateImg(document.getElementById(".manual-entry-cell"));
            cell.appendChild(link).classList = "cell-link";
        }
        else {
            let link = document.createElement("a");
            link.href = dict['link'];
            cell.appendChild(link).classList = "cell-link";
    
            let cellImg = document.createElement("img");
            cellImg.src = dict['img'];
            link.appendChild(cellImg).className = "cell-image img";
        }
    
        if (hasInput) {
            let titleInput = document.createElement("input");
            titleInput.value = dict['title'];
            cell.appendChild(titleInput).className = "cell-title title";
    
            let price = document.createElement("input");
            price.value = dict['price'];
            cell.appendChild(price).className = "cell-price price";
        }
        else {
            let title = document.createElement("div");
            title.innerHTML = dict['title'];
            cell.appendChild(title).className = "cell-title title";
    
            let price = document.createElement("div");
            price.innerText = dict['price'];
            cell.appendChild(price).className = "cell-price price";
        }
    },

    createCellInsertArray: function(dictArr, newDict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1") {
        gridItem.createCell(newDict, container, isAppend, isDeletable, hasInput, idd);
        return isAppend?dictArr.push(newDict):dictArr.unshift(newDict);
    },

    edit: function(newTitle, newPrice, newLink, newImg, gridId=gridItem.selectId) {
        let cell = document.getElementById(gridId);
    
        let title = cell.querySelector(".cell-title");
        title.innerHTML = newTitle;
    
        let price = cell.querySelector(".cell-price");
        price.innerHTML = newPrice;
    
        let link = cell.querySelector(".cell-link");
        link.href = newLink;
    
        let cellImg = cell.querySelector(".cell-image");
        cellImg.src = newImg;
    
        dictArray.edit(gridId, dArray);
    },

    deleteCell: function(gridId) {
        document.getElementById(gridId).remove();
        dictArray.deleteCell(gridId, dArray);
    }

};

let grid = {
    create_grid: function(dictArray, cols=3) {
        const container = document.getElementById("container");
        let numItems = dictArray.length;
    
        container.style.setProperty('--grid-rows', Math.ceil(numItems / cols));
        container.style.setProperty('--grid-cols', cols);
        for (c = 0; c < numItems; c++) {
            gridItem.createCell(dictArray[c], container, true)
        };
    },

    updateGridIds: function() {
        let arrGridItem = Array.from(document.querySelectorAll(".grid-item"));
        let idxManualEntry = arrGridItem.indexOf(document.getElementById("manual-entry-cell"));
        (idxManualEntry >= 0)?arrGridItem.splice(idxManualEntry, 1):arrGridItem;
    
        for (let i = 0; i < arrGridItem.length; i++) {
            arrGridItem[i].id = i;
        }
    }
};

grid.create_grid(dArray);
gridItem.createCell(dArray[0], document.getElementById("manual-entry"), true, false, true, "manual-entry-cell");

gridItem.createCellInsertArray(dArray, dArray[0], document.getElementById("container"));

grid.updateGridIds();
gridItem.edit("NewTitle", "$0", "https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array", "./svg/exit.svg", "1")