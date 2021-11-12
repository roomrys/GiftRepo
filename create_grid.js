// create grid based on database
grid.create_grid(dArray);

// create grid item for manual entry
editPopup.manualEntry.createGridItem();

//create grid item for new entry
editItems.newEntry.createGridItem();

// test functionality of insert
gridItem.createCellInsertArray(dArray, dArray[0], document.getElementById("container"));
grid.updateGridIds();
gridItem.edit("NewTitle", "$0", "https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array", "./svg/exit.svg", "7")