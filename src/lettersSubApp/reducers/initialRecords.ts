const storageRec = localStorage.getItem('letterRecords');
export const letterRec = storageRec ? JSON.parse(storageRec) : [
    {name: 'Слон', score: 92},
    {name: 'Ура', score: 86},
    {name: 'Снежок', score: 65},
    {name: 'Бобр', score: 60},
    {name: 'Искра', score: 49},
    {name: 'Сильвестр', score: 45},
    {name: 'Урия', score: 36},
    {name: 'Нурия', score: 30},
    {name: 'Кошак', score: 10}
];
const storageRec2 = localStorage.getItem('letterRecords2');
export const letterRec2 = storageRec2 ? JSON.parse(storageRec2) :  [
    {name: 'Сильвестр', score: 25},
    {name: 'RZ-25', score: 20},
    {name: 'Галочка', score: 16},
    {name: 'Ура', score: 13},
    {name: 'Upschool', score: 12},
    {name: 'Слон', score: 11},
    {name: 'Кошак', score: 10},
    {name: 'Сударыня Грусть', score: 9},
    {name: 'Нурия', score: 2}
];