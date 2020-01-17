const test = ""
const intCheck = test.replace(/[0-9]/g, "");

// var regex = /^[0-9]$/g;
// console.log(regex.test(test))
console.log(!intCheck);