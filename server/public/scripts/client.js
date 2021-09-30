$(document).ready(onReady);

function onReady(){
   $( 'button' ).on( 'click', onClickAnyButton )
   $('textarea').keydown(false)
}

let inputString = ""

function onClickAnyButton() {
    const buttonValue = $(this).text()
    
    // if(buttonValue !== "=" && buttonValue !== "C"){
    //     $('textarea').val(buttonValue)
    // }
    // else if (buttonValue === "C"){
    //     $('textarea').val('');
    // }
    // else if (buttonValue === "="){
    //     onPressSubmit()
    // }
    switch (buttonValue) {
        case "C":
            $('textarea').val('');
            inputString = ""
            break;

        case "=":
            onPressSubmit()
            break;

        case "Del":
            onPressDel()
            break;
    
        default:
            inputString = inputString + buttonValue
            $('textarea').val(inputString)
            break;
    }
    
}

function onPressSubmit() {
    if(inputString)
    {
        try {
            eval(inputString)

    let inputStringObj = {
            inputString : inputString
    }
    $.ajax({
        method: 'POST',
        url: '/input',
        data: inputStringObj
    }).then( function( response ){
        getData()
        

        
    }).catch( function( err ){
      
      alert( 'error adding message' );  
    })
} catch (error) {
         alert(error.message)   
}

    }
    else
    {alert("Data input cannot be empty")}
}

function getData() {
    $.ajax({
        method: 'GET',
        url: '/input',
        
    }).then( function( response ){

        let myList = $('ul')
        myList.empty()
        response.forEach(element => {
           let listEl = $("<li/>").appendTo(myList)
           $(listEl).text(element.myOperation)
           $('li').on( 'click', onClickAnyList)
        });
        let lastArrayEl = response.pop()
        let total = lastArrayEl.total
        $("h2").text(total)
        
    }).catch( function( err ){
      
      alert( 'error message' );  
    })
}

function onPressDel() {
    $.ajax({
        method: 'DELETE',
        url: '/input'
    }).then( function( response ){
        

    }).catch( function( err ){
     
    })
    $('ul').empty()
}

function onClickAnyList() {
    let historyText = $(this).text()
    $('textarea').val(historyText)
    inputString = historyText
    
}


// npm run dev (to start nodemon), npm start (to start and then i would have to manually stop)

