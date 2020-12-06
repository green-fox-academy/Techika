// --SETTINGS:--
let pHeight:number = 5, pencil:string = "*", paper:string =" ";
// --CORE:--
let lineText:string="",  finalWidth:number=(2*pHeight-1);
for (let pLevel:number=1; pLevel <= pHeight; pLevel += 1){
  for (let pLineChar:number=1; pLineChar <= finalWidth ; pLineChar +=1){
    let blanks:number=((finalWidth -1) / 2 ) + 1 - pLevel;
    if (pLineChar<=blanks){
      lineText += paper;
    }else if(pLineChar>blanks && pLineChar<=(finalWidth-blanks)){
      lineText += pencil;
    }
  }
  console.log(lineText);
  lineText="";
}