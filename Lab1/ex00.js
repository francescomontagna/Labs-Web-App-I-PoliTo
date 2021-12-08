'use strict';

let cutString = (stringArray) => {
    // Inplace
    stringArray.forEach((string, index) => {
        stringArray[index] = string.slice(0, 2) + string.slice(-2);   
    });
}

let inputArray = ["spring", "winter"];
cutString(inputArray);
console.log(inputArray);