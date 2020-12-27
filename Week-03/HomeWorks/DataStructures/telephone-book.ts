interface phoneBook {
  [key: string]:string;
}

let phoneBook:phoneBook={
  'William A. Lathan':'405-709-1865',
  'John K. Miller':'402-247-8568',
  'Hortensia E. Foster':'606-481-6467',
  'Amanda D. Newland':'319-243-5613',
  'Brooke P. Askew':'307-687-2982',
}

console.log("What is John K. Miller's phone number?");
let a:string='John K. Miller'
console.log(phoneBook[a]);
console.log("Whose phone number is 307-687-2982?");
// version oneliner
console.log(Object.keys(phoneBook).find(key => phoneBook[key] === '307-687-2982'));
// version classic
for (let num in phoneBook){
 if (phoneBook[num] === '307-687-2982'){
  console.log(num);
  }
}


