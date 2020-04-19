const fs = require('fs');
const loguear = (mensaje) => console.log(mensaje)

function backupSync(sourcePath,destinationPath,extensionACopiar){
    loguear("Inicio Backup Sync");
    let files= fs.readdirSync(sourcePath);
    copiados=0;
    for (let index = 0; index < files.length; index++) {
        let file = files[index];
        extension=file.split('.').pop();//divido por punto y armo una cola el primer elemnto es la extension
        if (extensionACopiar===extension){
            if (file.charAt(0)==='.'){
                loguear(`Se descarta el archivo: ${file} por empezar con .`);
            }else{
                try {
                    fs.copyFileSync(`${sourcePath}/${file}`, `${destinationPath}/${file}`);
                    copiados++;
                    loguear(`Copiando Archivo:  ${file}`);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }
    loguear("fin Backup Sync, "+copiados+" fueron backupados");
}

function backup(sourcePath,destinationPath,extensionACopiar){
    loguear("Inicio Backup Async");
    let files= fs.readdirSync(sourcePath);
    copiados=0;
    for (let index = 0; index < files.length; index++) {
        let file = files[index];
        extension=file.split('.').pop();//divido por punto y armo una cola el primer elemnto es la extension
        if (extensionACopiar===extension){
            if (file.charAt(0)==='.'){
                loguear(`Se descarta el archivo: ${file} por empezar con .`);
            }else{
                fs.copyFile(`${sourcePath}/${file}`, `${destinationPath}/${file}`, (err) => {
                    if (err) {
                        console.error(err);
                    }else{
                        loguear(`Copiando Archivo: ${file}`);
                    }
                });
                copiados++;
            }
        }
    }
    loguear(copiados+" seran backupados");
}

function limpiarTemporalSync(destinationPath){
    loguear("Inicio limpieza directorio BackUp");
    checkDirectorySync(destinationPath);
    let files= fs.readdirSync(destinationPath);
    for (let index = 0; index < files.length; index++) {
        let file = files[index];
        fs.unlinkSync(destinationPath+'/'+file)
    }

    loguear(`Fin limpieza directorio BackUp, ${files.length} fueron eliminados`);
}

function checkDirectorySync(directory) {
    try {
      fs.statSync(directory);
    } catch(e) {    
      try {
          fs.mkdirSync(directory);
      } catch(e) {
          throw e;
      }
    }
}

exports.limpiarTemporalSync = limpiarTemporalSync
exports.backupSync = backupSync
exports.backup = backup