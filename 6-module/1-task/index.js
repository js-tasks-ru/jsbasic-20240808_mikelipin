/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.elem.className = 'user-table';

    this.elem.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    for (const row of rows) {
      const tr = document.createElement('tr');
      for (const key in row) {
        const td = document.createElement('td');
        td.textContent = row[key];
        tr.appendChild(td);
      }

      const td = document.createElement('td');
      const button = document.createElement('button');
      button.textContent = 'X';
      td.appendChild(button);
      tr.appendChild(td);
      this.elem.querySelector('tbody').appendChild(tr);
    }

    this.elem.addEventListener('click', (event) => {
      const tr = event.target.closest('tr');
      tr.remove();
    });
  }
}
