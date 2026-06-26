// Алгоритми та утиліти для роботи з масивами

/**
 * 1. Ротація масиву вліво або вправо на K позицій
 * Складність за часом: O(n)
 * Складність за пам'яттю: O(1) при модифікації на місці (in-place)
 */
function rotateArray(arr, k, direction = "right") {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const n = arr.length;
    let shift = k % n;
    if (shift === 0) return arr;

    // Якщо напрямок вліво, трансформуємо його в еквівалентний зсув вправо
    if (direction === "left") {
        shift = n - shift;
    }

    // Допоміжна функція для розвороту частини масиву на місці
    const reverseRange = (array, start, end) => {
        while (start < end) {
            const temp = array[start];
            array[start] = array[end];
            array[end] = temp;
            start++;
            end--;
        }
    };

    // Алгоритм потрійного розвороту для зсуву без додаткової пам'яті
    reverseRange(arr, 0, n - 1);
    reverseRange(arr, 0, shift - 1);
    reverseRange(arr, shift, n - 1);

    return arr;
}

/**
 * 2. Реверс масиву
 * Складність за часом: O(n)
 */
function reverseArray(arr, inPlace = true) {
    if (!Array.isArray(arr)) return [];
    
    if (inPlace) {
        // Модифікація на місці (in-place): міняємо елементи місцями від країв до центру
        let start = 0;
        let end = arr.length - 1;
        while (start < end) {
            const temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
        return arr;
    } else {
        // Повернення нового масиву
        const newArr = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            newArr.push(arr[i]);
        }
        return newArr;
    }
}

/**
 * 3. Перемішування масиву за алгоритмом Фішера-Йєтса
 * Складність за часом: O(n)
 * Складність за пам'яттю: O(1) (модифікація in-place)
 */
function shuffleArray(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;

    // Прохід по масиву з кінця до початку для випадкової перестановки
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

/**
 * 4. Розділення масиву на дві частини за умовою (Partition)
 * Складність за часом: O(n)
 * Складність за пам'яттю: O(n)
 */
function partitionArray(arr, predicate) {
    if (!Array.isArray(arr)) return [[], []];
    if (typeof predicate !== "function") return [arr, []];

    const pass = [];
    const fail = [];

    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
            pass.push(arr[i]);
        } else {
            fail.push(arr[i]);
        }
    }

    return [pass, fail];
}

/**
 * 5. Розбиття масиву на підмасиви фіксованого розміру (Chunk)
 * Складність за часом: O(n)
 * Складність за пам'яттю: O(n)
 */
function chunkArray(arr, size) {
    if (!Array.isArray(arr) || size <= 0) return [];
    
    const result = [];
    let currentChunk = [];

    for (let i = 0; i < arr.length; i++) {
        currentChunk.push(arr[i]);
        
        // Якщо поточний підмасив заповнений або це останній елемент
        if (currentChunk.length === size || i === arr.length - 1) {
            result.push(currentChunk);
            currentChunk = [];
        }
    }

    return result;
}


// Блок тестування та вимірювання продуктивності
console.log("=== Тестування алгоритмів обробки масивів ===");

// Тест 1: Ротація масиву
const arrayToRotate = [1, 2, 3, 4, 5, 6, 7];
console.log("\n1. Ротація масиву:");
console.log("Початковий масив:", [...arrayToRotate]);
console.log("Зсув праворуч на 3 позиції:", rotateArray([...arrayToRotate], 3, "right"));
console.log("Зсув ліворуч на 2 позиції:", rotateArray([...arrayToRotate], 2, "left"));

// Тест 2: Реверс
const arrayToReverse = ["січень", "лютий", "березень", "квітень"];
console.log("\n2. Реверс масиву:");
console.log("Створення нового масиву (не на місці):", reverseArray(arrayToReverse, false));
console.log("Початковий масив не змінився:", arrayToReverse);
console.log("Модифікація на місці (in-place):", reverseArray(arrayToReverse, true));

// Тест 3: Перемішування Фішера-Йєтса
const arrayToShuffle = [10, 20, 30, 40, 50, 60, 70, 80];
console.log("\n3. Перемішування масиву:");
console.log("Результат випадкового розподілу:", shuffleArray([...arrayToShuffle]));

// Тест 4: Розділення за умовою (Partition)
const numbersToPartition = [12, 5, 8, 130, 44, 7, 21];
console.log("\n4. Розділення масиву (умова: елемент > 15):");
const [passed, failed] = partitionArray(numbersToPartition, x => x > 15);
console.log("Пройшли умову:", passed);
console.log("Не пройшли умову:", failed);

// Тест 5: Розбиття на частини (Chunk)
const dataToChunk = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("\n5. Розбиття на частини розміром 3:");
console.log(chunkArray(dataToChunk, 3));

// Тест 6: Крайні випадки
console.log("\n6. Перевірка крайових випадків:");
console.log("Передача порожнього масиву у ротацію:", rotateArray([], 5));
console.log("Передача некоректного розміру у chunk:", chunkArray([1, 2], -1));

// Тест 7: Вимірювання продуктивності на великому масиві
console.log("\n7. Вимірювання швидких алгоритмів на великому наборі даних:");
const bigArray = Array.from({ length: 100000 }, (_, i) => i);

const start = performance.now();
rotateArray(bigArray, 54321, "right");
const end = performance.now();

console.log(`Час виконання ротації для масиву з 100,000 елементів: ${(end - start).toFixed(4)} мс`);