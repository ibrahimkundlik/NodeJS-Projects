const fs = require("fs");

// const book = {
// 	author: "Eric Thomas",
// 	title: "Fault In Our Stars",
// };
// const bookJSON = JSON.stringify(book);
// fs.writeFileSync("json1.json", bookJSON);

// const dataBuffer = fs.readFileSync("json1.json");
// const dataString = dataBuffer.toString();
// const data = JSON.parse(dataString);
// console.log(data.author);

const data = JSON.parse(fs.readFileSync("json1.json").toString());
data.name = "Ibrahim";
data.age = 23;
const jsonData = JSON.stringify(data);
fs.writeFileSync("json1.json", jsonData);
