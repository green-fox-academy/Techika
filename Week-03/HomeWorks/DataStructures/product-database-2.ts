interface dBase {
  'Product name':string[],
  'Price':number[],
}

const dBase:dBase = {
  'Product name':['Eggs','Milk','Fish','Apples','Bread','Chicken'],
  'Price':[200,200,400,150,50,550]
}
// console.log(dBase);

function dataMiner (dBase:dBase,amount:number,moreOrLess:'more' | 'less'):void{
  switch (moreOrLess) {
    case 'less':
      dBase["Price"].forEach((p,i) => {
        if (p<amount) {
          console.log(dBase["Product name"][i]);
        }
      });
      break; 
    case 'more':
      dBase["Price"].forEach((p,i) => {
        if (p>amount) {
          console.log(dBase["Product name"][i],':',p);
        }
      });
      break;
  }
}

dataMiner(dBase,201,'less');
dataMiner(dBase,150,'more');