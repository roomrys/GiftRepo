let svgPath = './public/svg/';

let dictArray = {
    array: [], // use getArr to pull array from database

    defaultDict: {img: svgPath + '/present.svg', 
        price:'$888', 
        link:'https://codepen.io/sosuke/pen/Pjoqqp'},

    getArr: function(_callBack1, _callBack2) { // read from database
        fetch('/getDictArray')
            .then(res => res.json())
            .then(data => {
                dictArray.array = data;
                _callBack1();
                _callBack2();
            })
        // dictArray.array = [];
        // for (let i = 0; i<11; i++) {
        //     dictArray.array[i] = {...dictArray.defaultDict, title: "Title " + i}
        // };
        return
    },

    edit(gridId) {
        let cell = document.getElementById(gridId);
        let cellTitle = cell.querySelector(".cell-title");
        let cellPrice = cell.querySelector(".cell-price");
        let cellLink = cell.querySelector(".cell-link");
        let cellImg = cell.querySelector(".cell-image");
    
        dictArray.array[gridId] = {...dictArray.array[gridId],
            title: cellTitle.innerHTML,
            price: cellPrice.innerHTML,
            link: cellLink.href,
            img: cellImg.src
        }

        fetch('/editDictArray', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({id: -(-gridId-1), dict: dictArray.array[gridId]})
            })
    },

    add(newDict, isAppend=false) {
        isAppend?dictArray.array.push(newDict):dictArray.array.unshift(newDict);
        console.log(dictArray.array)
        fetch('/addDictArray', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(dictArray.array[0])
            })
    },

    deleteCell(gridId) {
        dictArray.array.splice(gridId, 1);
        grid.updateGridIds();
        console.log(dictArray.array);

        fetch('/deleteRowDictArray', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({id: -(-gridId-1)})
            })
    }
}

const container = document.getElementById("container");

let gridItem =  {
    referenceNode: -1, // default: no reference
    selectId: -1, //default: item not selected

    getDict: function(gridId=gridItem.selectId) {
        let cell = document.getElementById(gridId);

        this.dict = {...dictArray.defaultDict,
            title: cell.querySelector(".cell-title").innerHTML,
            price: cell.querySelector(".cell-price").innerHTML,
            link: cell.querySelector(".cell-link").href,
            img: cell.querySelector(".cell-image").src
        }

        return this.dict
    },

    appendOrInsert: function(isAppend, parentNode, newNode, 
            refNode = (this.referenceNode==-1)?container.firstElementChild:this.referenceNode.nextSibling) {
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
            cell.appendChild(cellDelete).className = "cell-delete button edit";
    
            let cellDeleteImg = document.createElement("img");
            cellDeleteImg.src = svgPath + 'trashcan.svg';
            cellDelete.appendChild(cellDeleteImg).className = "cell-delete-img img button";
    
            let cellEdit = document.createElement("div");
            cellEdit.innerHTML = "Edit";
            cell.appendChild(cellEdit).className = "cell-edit text-button button edit";

            if (!editItems.visibility.status) {
                cellDelete.classList.add("invisible");
                cellEdit.classList.add("invisible");
            }
        }
    
        if (hasInput) {
            let cellImg = document.createElement("img");
            cellImg.src = dict['img'];
            cell.appendChild(cellImg).className = "cell-image img";
    
            let link = document.createElement("input");
            link.type = "file";
            link.name = "fileToUpload";
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

    createCellInsertArray: function(newDict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1") {
        gridItem.createCell(newDict, container, isAppend, isDeletable, hasInput, idd);
        // isAppend?dictArray.array.push(newDict):dictArray.array.unshift(newDict);
        dictArray.add(newDict, isAppend);
        grid.updateGridIds();
    },

    edit: function(gridId=gridItem.selectId) {
        // editPopup.manualEntry.getDict();
        editPopup.manualEntry.getDict();
        
        let cell = document.getElementById(gridId);
    
        let title = cell.querySelector(".cell-title");
        title.innerHTML = editPopup.manualEntry.dict.title;
    
        let price = cell.querySelector(".cell-price");
        price.innerHTML = editPopup.manualEntry.dict.price;
    
        let link = cell.querySelector(".cell-link");
        link.href = editPopup.manualEntry.dict.link;
    
        let cellImg = cell.querySelector(".cell-image");
        cellImg.src = editPopup.manualEntry.dict.img;
    
        dictArray.edit(gridId, dictArray.array);
    },

    deleteCell: function(gridId) {
        document.getElementById(gridId).remove();
        dictArray.deleteCell(gridId, dictArray.array);
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

    updateGridIds: function() {
        let gridElements = grid.elements();

        (grid.index.newEntry() >= 0)?gridElements.splice(grid.index.newEntry(), 1):gridElements;
        (grid.index.manualEntry() >= 0)?gridElements.splice(grid.index.manualEntry() - 1, 1):gridElements;
    
        for (let i = 0; i < gridElements.length; i++) {
            gridElements[i].id = i;
        }
    },

    create_grid: function(cols=3) {
        let numItems = dictArray.array.length;
        container.style.setProperty('--grid-rows', Math.ceil(numItems / cols));
        container.style.setProperty('--grid-cols', cols);
        for (c = 0; c < numItems; c++) {
            gridItem.createCell(dictArray.array[c], container, true)
        };
        grid.updateGridIds();
    }
};

// for edit button
let editItems = {
    button: document.getElementById("edit-items-button"),

    newEntry: {
        createGridItem: function() {
            let newEntryDict = {...dictArray.defaultDict,
                title: "New Entry",
                price: "$",
                img: svgPath + "plus.svg",
                link: "javascript:void(0)"
            };
            // createCell: function(dict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1")
            gridItem.createCell(newEntryDict, container, false, false, false, "new-entry-cell");
            this.getElements();
            this.cell.classList.add("invisible", "edit", "button");
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
var editPopup = {
    isEdit: true, // either edit entry or new entry

    title: document.getElementById("title-edit-popup"),

    updateTitle: function() {
        this.isEdit?(this.title.innerHTML = "Edit Entry"):(this.title.innerHTML = "New Entry")
    },

    autoEntry: {
        title:  document.getElementById("title-auto-entry"),
        link: document.getElementById("link-auto-entry"),
        webScrape: function(urlToScrape, cb=console.log) {
            fetch(`/webScrape?url=${urlToScrape}`)
            .then(res => res.json())
            .then(data => {cb(data)});
        },
        updateEntry: function(newDict) {
            editPopup.manualEntry.updateElements(newDict);
            editPopup.autoEntry.title.value = newDict['title'];
        }
    },

    manualEntry: {
        getDefaultDict: function() {
            this.defaultDict = {...dictArray.defaultDict,
                title: 'Yoga Mat',
                price: "$38.95",
                img: 'https://m.media-amazon.com/images/I/816mJ+SP30S._AC_SX425_.jpg',//svgPath + "plus.svg",
                link: 'https://www.amazon.com/dp/B08H21593X?pd_rd_i=B08H21593X&pd_rd_w=SmSAp&pf_rd_p=7ea8e9d0-fed1-49e8-a002-f2d3f5cb151d&pd_rd_wg=RKJxO&pf_rd_r=56KTZEVETN0NGXEF63AN&pd_rd_r=80c37d9f-09b9-4dcd-a348-bc757d19765c'
            };

            return this.defaultDict;
        },

        getDict: function() {
            let cell = document.getElementById("manual-entry-cell");

            this.dict = {...dictArray.defaultDict,
                title: cell.querySelector(".cell-title").value,
                price: cell.querySelector(".cell-price").value,
                img: cell.querySelector(".cell-image").src,
                link: document.getElementById("link-auto-entry").value
            }

            return this.dict
        },

        createGridItem: function() {
            // createCell: function(dict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1")
            this.getDefaultDict();
            gridItem.createCell(this.defaultDict, document.getElementById("manual-entry"), true, false, true, "manual-entry-cell");
            this.getElements();
        },

        getElements: function() {
            this.cell=  document.getElementById("manual-entry-cell"),
            this.title = this.cell.querySelector(".cell-title"),
            this.price = this.cell.querySelector(".cell-price"),
            this.image = this.cell.querySelector(".cell-image"),
            this.link = this.cell.querySelector(".cell-link")
        },

        updateElements: function(newDict) {
            this.getElements();
            this.title.value = newDict['title'];
            this.price.value = newDict['price'];
            this.image.src = newDict['img'];
        },

        updateTitle: function(newTitle) {
            this.getElements();
            this.title.value = newTitle;
        },

        updateImage: function() {
            this.getElements();
            this.image.src = URL.createObjectURL(editPopup.manualEntry.link.files[0]);
        }

    },

    visibility: {
        wall: document.getElementById('wall'),
        container: document.getElementById("container"),
        closeEditorClassList: ["header", "edit-popup"],
        status: false,
        toggle: function (isOpen = this.status) {
            editPopup.updateTitle();

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
        (gridId === "new-entry-cell")?(gridItem.dict = editPopup.manualEntry.getDefaultDict()):gridItem.getDict(gridId);

        editPopup.autoEntry.title.value = gridItem.dict.title;
        editPopup.manualEntry.title.value = gridItem.dict.title;
        editPopup.manualEntry.price.value = gridItem.dict.price;
        editPopup.autoEntry.link.value = gridItem.dict.link;
        editPopup.manualEntry.image.src = gridItem.dict.img;
    },

    save: function(gridId=gridItem.selectId) {

        // if not select new image, then update file list anyway
        let imagePath = editPopup.manualEntry.image.src;
        let imagePSlice = imagePath.slice(0, 4);
        // if image is online, no need to upload
        if (imagePSlice != 'http') {
            if (imagePSlice == 'blob') {
                // revoke url object
                editPopup.manualEntry.getElements();
                URL.revokeObjectURL(editPopup.manualEntry.image.src);
            }
            // image is on client-side, need to upload
            else {
                let imageName = imagePath.substring(imagePath.lastIndexOf('/')+1);
                let newList = new DataTransfer();
                let filesToAdd = new File([imagePath], imageName);
                newList.items.add(filesToAdd);
                editPopup.manualEntry.link.files = newList.files;
            }
            console.log(editPopup.manualEntry.link.files);

            // save uploaded image (must be FormData to use multer)
            const fd = new FormData();
            fd.append(editPopup.manualEntry.link.name, editPopup.manualEntry.link.files[0]);
            fetch('/uploadImg', {
                method: 'POST',
                body: fd
                }).then(response => {
                    response.json();
                }).then(success => {
                    console.log(success);
                });

            // need dynamic name returned from fetch, but promise stays 'pending'
            editPopup.manualEntry.image.src = `/uploads/${editPopup.manualEntry.link.files[0].name}`;
            console.log(editPopup.manualEntry.image.src);

            // edit/append-to the grid
            if (gridId === "new-entry-cell") {
                // createCellInsertArray: function(dictArr, newDict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1")
                gridItem.createCellInsertArray(editPopup.manualEntry.getDict(), container)
            }
            else {
                gridItem.edit(gridId)
            }
        }
        else {
            // edit/append-to the grid
            if (gridId === "new-entry-cell") {
                // createCellInsertArray: function(dictArr, newDict, container, isAppend=false, isDeletable=true, hasInput=false, idd="-1")
                gridItem.createCellInsertArray(editPopup.manualEntry.getDict(), container)
            }
            else {
                gridItem.edit(gridId)
            }
        }
    }

}