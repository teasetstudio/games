const storageRec = localStorage.getItem('letterRecords');
export const letterRec = storageRec ? JSON.parse(storageRec) : [
    {name: 'Слон', score: 50},
    {name: 'Ура', score: 44},
    {name: 'Снежок', score: 40},
    {name: 'Бобр', score: 35},
    {name: 'Искра', score: 27},
    {name: 'Сильвестр', score: 22},
    {name: 'Урия', score: 18},
    {name: 'Нурия', score: 12},
    {name: 'Кошак', score: 10}
];
const storageRec2 = localStorage.getItem('letterRecords2');
export const letterRec2 = storageRec2 ? JSON.parse(storageRec2) :  [
    {name: 'Сильвестр', score: 21},
    {name: 'RZ-25', score: 20},
    {name: 'Галочка', score: 16},
    {name: 'Ура', score: 13},
    {name: 'Upschool', score: 12},
    {name: 'Слон', score: 11},
    {name: 'Кошак', score: 9},
    {name: 'Сударыня Грусть', score: 5},
    {name: 'Нурия', score: 2}
];