let colors:string[]=['blue','red','cian','brown','yellow','pink'];
console.log(colors[Math.round(Math.random()*colors.length-1)]);
console.log(colors[1]);
//return colors[Math.random()*colors.length-1];



function parameterTest
({
    num1: number
}={num1=1,}
):void{
    console.log(num1);
    
}

function parameterTest2
({
    num1:number=1,
}={}
):void{
    console.log(num1);
    
}

interface paramTest3{
    num3:number
}

let paramTest3:paramTest3 = {num3:4};

