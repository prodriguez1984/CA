/**
 * toma dos arrays de números ordenados y en forma eficiente los combina en uno solo, aún ordenado
 * @param {number[]} arrA un array de números ordenados
 * @param {number[]} arrB otro array de números ordenados
 * @returns {number[]} un nuevo array de números ordenados
 */
function combinarDosArrays(arrA, arrB) {
	let result=arrA.slice();
    for (let index = 0; index < arrB.length; index++) {
        let element = arrB[index];
        if(!isNaN(element) ){
            result.push(element);
        }
    }
    return result;
}

/**
 * toma un array de muchos arrays de números ordenados y los combina en uno solo, aún ordenado
 * @param {number[][]} arrs el array de arrays de números que quiero combinar
 * @returns {nuber[]} el nuevo array de números ordenados
 */
function combinarNArrays(arrs) {
	let result = [];
	for (let index = 0; index < arrs.length; index++) {
        let element = arrs[index];
		result=combinarDosArrays(result,element);
    }
    return result;
}

// exportar ambas funciones
exports.combinarDosArrays = combinarDosArrays
exports.combinarNArrays = combinarNArrays