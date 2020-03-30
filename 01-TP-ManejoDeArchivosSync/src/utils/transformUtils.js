/**
 * separa el string ante cada ocurrencia del separador, y agrega al array resultado siempre que pueda
 * transformar al fragmento de string en numero.
 * @param {string} str 
 * @param {string} separador
 * @returns {number[]} array de numeros
 */
function transformarStringEnArrayDeNumeros(str, separador) {
	let arr = str.split(separador);
    let result = [];
    for (let index = 0; index < arr.length; index++) {
        let element = arr[index];
        if(!isNaN(element) ){
            result.push(element);
        }
    }
    return result;
}

/**
 * concatena todos los numeros entre sí, intercalando un separador entre número y número.
 * @param {number[]} arr 
 * @param {string} separador 
 * @returns {string} el nuevo string
 */
function transformarArrayDeNumerosAUnSoloString(arr, separador) {
	let result = "";
    for (let index = 0; index < arr.length; index++) {
        let element = arr[index];
        result = result + element;
        if(index < arr.length - 1){
            result = result + separador;
        }
    }
    return result;
}

// exportar ambas funciones
exports.transformarStringEnArrayDeNumeros = transformarStringEnArrayDeNumeros
exports.transformarArrayDeNumerosAUnSoloString = transformarArrayDeNumerosAUnSoloString