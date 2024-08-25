function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {

      if (table.rows[i].cells[j].cellIndex === 2 && table.rows[i].cells[j].textContent === 'm') {
        table.rows[i].classList.add('male');
      } else if (table.rows[i].cells[j].cellIndex === 2 && table.rows[i].cells[j].textContent === 'f') {
        table.rows[i].classList.add('female');
      }

      if (table.rows[i].cells[j].cellIndex === 1 && Number(table.rows[i].cells[j].textContent) < 18) {
        table.rows[i].style.textDecoration = 'line-through';
      }

      if (table.rows[i].cells[j].cellIndex === 3 && table.rows[i].cells[j].dataset.available === 'true') {
        table.rows[i].classList.add('available');
      } else if (table.rows[i].cells[j].cellIndex === 3 && table.rows[i].cells[j].dataset.available === 'false') {
        table.rows[i].classList.add('unavailable');
      }

      if (table.rows[i].rowIndex !== 0 && ( table.rows[i].cells[j].dataset.available === 'true' )) {
        continue;
      } else if(table.rows[i].rowIndex !== 0 && (table.rows[i].cells[j].dataset.available === 'false' || table.rows[i].cells[j].cellIndex + 1 === table.rows[i].cells.length)) {
        table.rows[i].setAttribute('hidden', 'true');
      }
    }
  }
}
