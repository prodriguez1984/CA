var backUtils = require('../src/BackupUtilities.js');

const source = './in'
const destinationSync = './sinc/'
const destinationAsync = './asinc/'

backUtils.limpiarTemporalSync(destinationSync);
backUtils.backupSync(source,destinationSync,'txt');
backUtils.limpiarTemporalSync(destinationAsync);
backUtils.backup(source,destinationAsync,'json');

