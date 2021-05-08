const storageHeroes = localStorage.getItem('heroes');
export const heroes = storageHeroes ? JSON.parse(storageHeroes) : [
    {name: 'Радость', score: 74},
    {name: 'RZ-25', score: 78},
    {name: 'Галочка', score: 80},
    {name: 'Агнешка', score: 86},
    {name: 'Tinker', score: 94},
    {name: 'Upschool', score: 108},
    {name: 'ЭЮЯ', score: 130},
    {name: 'Сударыня Грусть', score: 156},
    {name: 'Госпожа Печаль', score: 172}
];
const storageHeroes2 = localStorage.getItem('heroes2');
export const heroes2 = storageHeroes2 ? JSON.parse(storageHeroes2) :  [
    {name: 'Радость', score: 140},
    {name: 'RZ-25', score: 142},
    {name: 'Галочка', score: 145},
    {name: 'Агнешка', score: 150},
    {name: 'Upschool', score: 156},
    {name: 'Tinker', score: 158},
    {name: 'ЭЮЯ', score: 208},
    {name: 'Сударыня Грусть', score: 404},
    {name: 'Госпожа Печаль', score: 436}
];