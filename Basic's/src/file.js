// means do oprations on files 
// fs 
const fs = require("fs")
/*
// sync blocking 
fs.writeFileSync("./test.txt","hey thare");

// async non blocking 

default threads Pool size
max depands on cpu cores how much cors cpu has

fs.writeFile("./test.txt","hey thare",(err)=>{
    //console.log(err)
})

*/

const filetext =  fs.readFileSync("./contact.txt","utf-8");
console.log(filetext);


fs.readFile("./contact.txt","utf-8",(err,res)=>{
    if(err){
        console.log("error")
    }else{
        console.log(res)
    }
});

// diff in both is astnc or sync is we got a call back async or we can handle that by try catch

fs.appendFileSync("./test.txt", "hey there\n", { encoding: 'utf8', flag: 'a' });