/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */

const isNotArray = (array) => !(array instanceof Array);
const isArrayEmpty = (array = []) => array.length == 0;
const isNotFunction = (fn) => !(fn instanceof Function);

function isAllTrue(array, fn) {
    if (isNotArray(array)) throw new Error("empty array");
    if (isArrayEmpty(array)) throw new Error("empty array");
    if (isNotFunction(fn)) throw new Error("fn is not a function");
    for (element in array) if (!fn(array[element])) return false;

    return true;
}

console.log("Test 1:");

let arr1 = [1, 2, 3, 4, 10];
let func1 = (n) => n < 10;
let a = isAllTrue(arr1, func1);

console.log(a);

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {
    if (isNotArray(array)) throw new Error("empty array");
    if (isArrayEmpty(array)) throw new Error("empty array");
    if (isNotFunction(fn)) throw new Error("fn is not a function");
    for (element in array) if (fn(array[element])) return true;

    return false;
}

console.log("Test 2:");

let arr2 = [1, 2, 3, 4, 10];
let func2 = (n) => n < 10;
let b = isSomeTrue(arr2, func2);

console.log(b);

/*
 Задание 3:

 3.1: Функция принимает заранее неизвестное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...rest) {
    let args = [];

    if (isNotFunction(fn)) throw new Error("fn is not a function");
    for (element in rest) {
        try {
            fn(rest[element]);
        } catch (e) {
            args.push(rest[element]);
        }
    }

    return args;
}

console.log("Test 3:");
let func3 = (n) => {
    if (n < 100) throw new Error("Exception!");
};

console.log(returnBadArguments(func3, 10, 489, 65, 2, 200));

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом "number is not a number")
   - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */

const getSum = (number, args = []) =>
    args.reduce((acc, arg) => acc + arg, number);

const getDif = (number, args = []) =>
    args.reduce((acc, arg) => acc - arg, number);

const getDiv = (number, args = []) =>
    args.reduce((acc, arg) => acc / arg, number);

const getMul = (number, args = []) =>
    args.reduce((acc, arg) => acc * arg, number);

const hasZeroInArray = (arr = []) => arr.indexOf(0) != -1;

const isNotNumber = (number) => typeof number != "number";

const isUndefined = (number) => number === undefined;

const getCalculatorObject = (number, args = []) => ({
    sum: getSum(number, args),
    dif: getDif(number, args),
    div: getDiv(number, args),
    mul: getMul(number, args),
});

function calculator(number, ...nums) {
    if (isUndefined(number)) number = 0;
    else if (isNotNumber(number)) throw new Error("number is not a number");
    if (hasZeroInArray(nums)) throw new Error("division by 0");
    return getCalculatorObject(number, nums);
}

console.log("Test 4:");
console.log(calculator(34, 46556, 4535, 2435425));

/* При решении задач, пострайтесь использовать отладчик */

/*export { isAllTrue, isSomeTrue, returnBadArguments, calculator };*/
