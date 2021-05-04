export function listCreator(db, listType, filter) {
  const template = (value, title, classes, attributes) => {
    return `
    <option class="${classes}" value="${value}" ${attributes}>${title}</option>
    `;
  };
  let newList = '';
  newList += template('-', db.placeholders[listType], ['-'], ['disabled', 'selected']);

  db[listType].forEach((element) => {
    if ((filter && element.classes.includes(filter)) || !filter) {
      newList += template(element.title, element.title, element.classes);
    }
  });
  return newList;
}
