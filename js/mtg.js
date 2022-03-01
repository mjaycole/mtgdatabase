const randRequestURL = 'https://api.scryfall.com/cards/random';
var nameRequestURL = 'https://api.scryfall.com/cards/named?fuzzy='
var advancedURL = 'https://api.scryfall.com/cards/search?order=name&q=f:standard'

function requestRandomCard(){
    let numToRequest = document.getElementById('num').value;

    document.querySelector('.card-container').innerHTML = "";

    for (let i = 0; i < numToRequest; i++)
    {
        fetch(randRequestURL)
        .then (function (response){
            return response.json();
        })
        .then (function (jsonObject){
            dislpayIndividualCard(jsonObject);
        })
    }
}

function requestCardByName(){
    let cardName = document.getElementById('card-name').value;
    let tempRequestURL = nameRequestURL + cardName;

    document.querySelector('.card-container').innerHTML = "";

    fetch(tempRequestURL)
        .then (function (response){
            return response.json();
        })
        .then (function (jsonObject){
            dislpayIndividualCard(jsonObject);
        })    
}

function advancedSearch(){
    let color = "";
    if(document.querySelectorAll('input[id="color"]:checked').length > 0)
    {
        let colors = document.querySelectorAll('input[id="color"]:checked');
        color = color + "+c:";

        colors.forEach(c => {
            color = color + c.value;
        })
    }

    let cardType = "+t:" + document.getElementById('card-type').value;
    if (document.getElementById('card-type').value == "")
    {
        cardType = "";
    }

    let cardRules = '+o:"' + document.getElementById('oracle-text').value +'"';
    if (document.getElementById('oracle-text').value == "")
    {
        cardRules = "";
    }

    let cmc = "+cmc=" + document.getElementById('cmc').value;
    if (document.getElementById('cmc').value == "")
    {
        cmc = "";
    }

    let power = "+pow=" + document.getElementById('power').value;
    if (document.getElementById('power').value == "")
    {
        power = "";
    }

    let toughness = "+tou=" + document.getElementById('toughness').value;
    if (document.getElementById('toughness').value == "")
    {
        toughness = "";
    }

    let tempRequestURL = advancedURL + color + cardType + cardRules + cmc + power + toughness;

    document.querySelector('.card-container').innerHTML = "";

    console.log(tempRequestURL);
    fetch(tempRequestURL)
        .then (function (response){
            return response.json();
        })
        .then (function (jsonObject){
            if (jsonObject['data'] != null)
                displayCards(jsonObject);
            else
                dislpayIndividualCard(jsonObject);
        })    
}


function dislpayIndividualCard(jsonObject) {

        let cardContainer = document.querySelector('.card-container');

        let newCard = document.createElement('div');
        newCard.setAttribute('class', 'card');
        
        let cardImage = document.createElement('img');

        try {
            cardImage.src = jsonObject['image_uris']['normal'];
        }

        catch (error) {

        }


    
        newCard.append(cardImage);
        cardContainer.append(newCard);


}


function displayCards(jsonObject) {

    console.log(jsonObject);
    jsonObject['data'].forEach(card => {
        try {
            let cardContainer = document.querySelector('.card-container');
    
            let newCard = document.createElement('div');
            newCard.setAttribute('class', 'card');
            
            let cardImage = document.createElement('img');

            cardImage.src = card['image_uris']['normal'];
        
            newCard.append(cardImage);
            cardContainer.append(newCard);
        }
        catch (error) {
            console.log(error);
        }
    });
}