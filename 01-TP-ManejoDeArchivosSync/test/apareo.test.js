var fileUtils  = require('../src/utils/fileUtils.js');
var transformUtils  = require('../src/utils/transformUtils.js');
var apareo  = require('../src/apareo.js');

try {
	console.log("// leo los 4 archivos a memoria");
	console.log("// preparo los 4 arrays a partir de los archivo leidos");
	let arrayDeArrays=[];
	
	let strArray=fileUtils.leerArchivoComoString("./in/10NumerosOrdenadosEntre1y50(setA).in");
	let array=transformUtils.transformarStringEnArrayDeNumeros(strArray,',');
	arrayDeArrays.push(array);
	
	strArray=fileUtils.leerArchivoComoString("./in/10NumerosOrdenadosEntre1y50(setB).in");
	array=transformUtils.transformarStringEnArrayDeNumeros(strArray,',');
	arrayDeArrays.push(array);
	
	strArray=fileUtils.leerArchivoComoString("./in/imparesOrdenadosEntre1y999.in");
	array=transformUtils.transformarStringEnArrayDeNumeros(strArray,',');
	arrayDeArrays.push(array);
	
	strArray=fileUtils.leerArchivoComoString("./in/paresOrdenadosEntre2y1000.in");
	array=transformUtils.transformarStringEnArrayDeNumeros(strArray,',');
	arrayDeArrays.push(array);

	
	console.log("// combino los primeros dos arrays");
	let result=apareo.combinarDosArrays(arrayDeArrays[0],arrayDeArrays[1]);
	strArray = transformUtils.transformarArrayDeNumerosAUnSoloString(result,',');	
	fileUtils.escribirTextoEnArchivo("./out/combinado2.out",strArray,true);
	let data = fileUtils.leerArchivoComoString("./out/combinado2.out");
	console.log(data)
	
	console.log("// combino los cuatro arrays");
	result=apareo.combinarNArrays(arrayDeArrays);
	strArray = transformUtils.transformarArrayDeNumerosAUnSoloString(result,',');	
	fileUtils.escribirTextoEnArchivo("./out/combinado.out",strArray,true);
	data = fileUtils.leerArchivoComoString("./out/combinado.out");
	console.log(data)
} catch (algunError) {
	console.log(algunError)
}