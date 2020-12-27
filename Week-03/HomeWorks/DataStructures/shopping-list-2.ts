// Shopping list 2

// Represent the following products with their prices
let products = {
    Milk: 1.07,
    Rice: 1.59,
    Eggs: 3.14,
    Cheese: 12.60,
    "Chicken Breasts": 9.40,
    Apples:	2.31,
    Tomato:	2.58,
    Potato:	1.75,
    Onion:	1.10,
};
let Shopping={
    Bob:{// Represent Bob's shopping list
        Milk:	3,
        Rice:	2,
        Eggs:	2,
        Cheese:	1,
        'Chicken Breasts':	4,
        Apples:	1,
        Tomato:	2,
        Potato:	1,
    },
    Alice:{// Represent Alice's shopping list
        Rice:	1,
        Eggs:	5,
        'Chicken Breasts':2,
        Apples:	1,
        Tomato:	10,
    }
};

// console.log(Shopping.Alice.Eggs);
// console.log(Shopping['Alice']['Eggs']);


function howMuch (productPrices:any={},shoppingLists:any={},shopper:string){
    let thisMuch:number = 0;
    for (let shopped in shoppingLists[shopper]){
        // console.log(`${shopped}: value is: ${shoppingLists[shopper][shopped]}`);
        // console.log(productPrices[shopped]);     
        thisMuch += (productPrices[shopped] * shoppingLists[shopper][shopped]);      
    }
    console.log(`${shopper} was shopping for $${thisMuch}`);  
}
function massCompare (shoppingLists:any={},contenders:string[],contestItem:string){
    let contest:any = {};
    contenders.forEach(contender => {
      if(contender in shoppingLists){
        if (contestItem in shoppingLists[contender]){
            contest[contender] = shoppingLists[contender][contestItem];
        }else{contest[contender] = 0;}
      }else{contest[contender] = 0;} 
    });
    console.log(contest);
    console.log(
      Object.keys(contest).filter(x => {
        return contest[x] === Math.max.apply(null,
          Object.values(contest));
        })
    );
    
}
// How much does Bob pay?
howMuch(products,Shopping,'Bob');
// How much does Alice pay?
howMuch(products,Shopping,'Alice');
// Who buys more Rice?
massCompare(Shopping,['Bob','Alice','Mark'],'Rice');
// Who buys more Potato?
// Who buys more different products?
// Who buys more products? (piece)