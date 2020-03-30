var fs = require('fs');
/**
 * lee y devuelve el contenido de un archivo como texto en 'utf-8'
 * @param {string} ruta relativa al directorio del proyecto
 * @return {string} el texto leído
 */
function leerArchivoComoString(ruta) {
	try {
		return fs.readFileSync(ruta, 'utf-8')
    } catch (algunError) {
		console.log(algunError)
    }
}

/**
 * escribe el texto en el archivo de la ruta, sólo si tal archivo existe. sino, lanza error.
 * @param {string} ruta relativa al directorio del proyecto
 * @param {string} texto 
 */
function escribirTextoEnArchivo(ruta, texto, shouldCreateIfNotExists) {
	let file;
	try {
		if(shouldCreateIfNotExists===true){
			  file = fs.openSync(ruta, 'a');
			  fs.appendFileSync(file, texto, 'utf8');
		}else{
			fs.writeFileSync(ruta, texto,'r+');
		}
	} catch (err) {
		console.log('se rompio a la mismisima verga');
	} finally {
	  if (file !== undefined)
		fs.closeSync(file);
	}
}

// exportar ambas funciones
exports.leerArchivoComoString = leerArchivoComoString
exports.escribirTextoEnArchivo = escribirTextoEnArchivo