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
const container = document.getElementById("container");

let gridItem =  {
    referenceNode: -1, // default: no reference
    selectId: -1, //default: item not selected

    appendOrInsert: function(isAppend, parentNode, newNode, refNode=(this.referenceNode==-1)?container.firstElementChild:this.referenceNode.nextSibling) {
        return isAppend?parentNode.appendChild(newNode):parentNode.insertBefore(newNode, refNode)
    },

    createCell: function(dict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1") {
        
        let cell = document.createElement("div");
        if (idd !== "-1") {
            cell.id = idd;
        }
        gridItem.appendOrInsert(isAppend, container, cell).className = "grid-item";
    
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
    elements: function() {
        return Array.from(document.querySelectorAll(".grid-item"));
    },

    index: {
        manualEntry: function() {
            return grid.elements().indexOf(document.getElementById("manual-entry-cell"));
        },

        newEntry: function() {
            return grid.elements().indexOf(document.getElementById("new-entry-cell"));
        },
    },

    create_grid: function(dictArray, cols=3) {
        let numItems = dictArray.length;
    
        container.style.setProperty('--grid-rows', Math.ceil(numItems / cols));
        container.style.setProperty('--grid-cols', cols);
        for (c = 0; c < numItems; c++) {
            gridItem.createCell(dictArray[c], container, true)
        };
    },

    updateGridIds: function() {
        let gridElements = grid.elements();

        (grid.index.newEntry() >= 0)?gridElements.splice(grid.index.newEntry(), 1):gridElements;
        (grid.index.manualEntry() >= 0)?gridElements.splice(grid.index.manualEntry() - 1, 1):gridElements;
    
        for (let i = 0; i < gridElements.length; i++) {
            gridElements[i].id = i;
        }
    }
};

// for edit button
let editItems = {
    button: document.getElementById("edit-items-button"),

    newEntry: {
        createGridItem: function() {
            let newEntryDict = {...dictArray.defaultDict,
                title: "New Entry",
                price: "",
                img: "./svg/plus.svg"
            };
            // createCell: function(dict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1")
            gridItem.createCell(newEntryDict, container, false, false, false, "new-entry-cell");
            this.getElements();
            this.link.href = "javascript:void(0)";
            this.cell.classList.add("invisible", "edit");
            gridItem.referenceNode = this.cell;
        },

        getElements: function() {
            this.cell = document.getElementById("new-entry-cell"),
            this.title = this.cell.querySelector(".cell-title"),
            this.price = this.cell.querySelector(".cell-price"),
            this.image =  this.cell.querySelector(".cell-image"),
            this.link = this.cell.querySelector(".cell-link")
        }
    },

    identityList: ["edit-items-button", "edit-items-box"], 

    visibility: {
        toggleElementsList: function() {
            return Array.from(document.getElementsByClassName("edit"))
        },
        toggleLinksList: function() {
            return document.querySelectorAll("a.cell-link")
        },
        status: false,
        toggle: function(isVisible=!(this.status), button=editItems.button) {
            this.status = isVisible;
            let addOrRemove = function(element, classToAddOrRemove, isRemove=isVisible) {
                isRemove?element.classList.remove(classToAddOrRemove):element.classList.add(classToAddOrRemove);
            };
            this.toggleElementsList().forEach( element => {
                addOrRemove(element, "invisible");
            })
            this.toggleLinksList().forEach( element => {
                addOrRemove(element, "disabled-link", !isVisible);
            })
            isVisible?(button.innerHTML = "Exit Edit"):(button.innerHTML = "Edit Items");
            return this.status
        }
    }
};

// for edit popup
let editPopup = {
    title: document.getElementById("title-edit-popup"),

    manualEntry: {
        createGridItem: function() {
            // createCell: function(dict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1")
            gridItem.createCell(dArray[0], document.getElementById("manual-entry"), true, false, true, "manual-entry-cell");
            this.getElements();
        },

        getElements: function() {
            this.cell=  document.getElementById("manual-entry-cell"),
            this.title = this.cell.querySelector(".cell-title"),
            this.price = this.cell.querySelector(".cell-price"),
            this.image = this.cell.querySelector(".cell-image"),
            this.link = this.cell.querySelector(".cell-link")
        },

        updateTitle: function(newTitle) {
            this.getElements();
            this.title.value = newTitle;
        },

        updateImage: function() {
            this.getElements();
            this.image.src = URL.createObjectURL(editPopup.manualEntry.link.files[0])
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
    },

    edit: function(gridId=gridItem.selectId) {
        editPopup.manualEntry.getElements();

        let cell = document.getElementById(gridId);
    
        let title = cell.querySelector(".cell-title");
        editPopup.autoEntry.title.value = title.innerHTML;
        editPopup.manualEntry.title.value = title.innerHTML;
    
        let price = cell.querySelector(".cell-price");
        editPopup.manualEntry.price.value = price.innerHTML;
    
        let link = cell.querySelector(".cell-link");
        editPopup.autoEntry.link.value = link.href;
    
        let cellImg = cell.querySelector(".cell-image");
        editPopup.manualEntry.image.src = cellImg.src;
    }
}