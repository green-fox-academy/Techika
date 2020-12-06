let lines: number = 10,
  pencil: string = "#",
  paper: string = " ",
  //margin: number,
  lineDraw: string = "";

for (let line = 1; line <= lines; line += 1) {
  if (line === 1 || line === lines) {
    for (let L1: number = 1; L1 <= lines; L1 += 1) {
      lineDraw += pencil;
    }
    console.log(lineDraw);
    lineDraw = "";
  } else {
    for (let L1: number = 1; L1 <= lines - 2; L1 += 1) {
      if (L1 === line - 1) {
        lineDraw += pencil;
      } else {
        lineDraw += paper;
      }
    }
    console.log(pencil + lineDraw + pencil);
    lineDraw = "";
  }
}
