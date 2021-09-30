const express = require( 'express' );
const app = express();
const port = process.env.PORT || 3000


app.use(express.static("server/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let myResponseArray = []


app.post( '/input', ( req, res) =>{
    let total = ""
    const myOperation = req.body.inputString
    let myOperationArray = myOperation.split("")

    if ( myOperationArray.indexOf("+")> -1){

        let myArray = myOperation.split("+")
        
        let myNum1 = parseFloat(myArray[0])
        let myNum2 = parseFloat(myArray[1])
        total = myNum1 + myNum2
    }
    else if ( myOperationArray.indexOf("-")> -1){

        let myArray = myOperation.split("-")
        
        let myNum1 = parseFloat(myArray[0])
        let myNum2 = parseFloat(myArray[1])
        total = myNum1 - myNum2
    }
    else if ( myOperationArray.indexOf("*")> -1){

        let myArray = myOperation.split("*")
        
        let myNum1 = parseFloat(myArray[0])
        let myNum2 = parseFloat(myArray[1])
        total = myNum1 * myNum2
    }
    else if ( myOperationArray.indexOf("/")> -1){

        let myArray = myOperation.split("/")
        
        let myNum1 = parseFloat(myArray[0])
        let myNum2 = parseFloat(myArray[1])
        total = myNum1 / myNum2
    }
    else {
        total = "wrong input"
    }
    let myResponseObj = {
        // total,myOperation
        total:total,
        myOperation:myOperation
    }
    myResponseArray.push(myResponseObj)
    res.sendStatus(200)
})

app.get( '/input', ( req, res) =>{
    res.send(myResponseArray)
    res.sendStatus(200)
})

app.delete( '/input', ( req, res) =>{
    myResponseArray = []
})

app.listen(port, () => console.log( `Example app listening on port ${port}` ));