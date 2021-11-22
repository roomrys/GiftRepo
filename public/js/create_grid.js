// create grid based on database
dictArray.getArr(grid.create_grid);
console.log(dictArray.array)

// create grid item for manual entry
editPopup.manualEntry.createGridItem();

//create grid item for new entry
editItems.newEntry.createGridItem();

// test functionality of insert
// gridItem.createCellInsertArray(dictArray.array[0], document.getElementById("container"));
// grid.updateGridIds();