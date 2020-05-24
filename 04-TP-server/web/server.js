const express = require('express');
const app = express();
app.use(express.json())

const puerto = 7070;

const fs = require('fs');

const dataPath = './data/students.json';

const readFile = (callback, returnJson = true, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    });
};

const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port}`)
});

app.post('/api/addStudent', (req, res) => {
    console.log('request recibido')

    readFile(data => {
        var dni = req.body.dni;
        var dniPosition = Object.keys(data).indexOf(dni);
        console.log(dniPosition);
        if (dniPosition === -1) {
            data[dni] = JSON.parse(JSON.stringify(req.body));

            writeFile(JSON.stringify(data, null, 2), () => {
                sendResponce(res, 200, 'El estudiante con dni ' + dni + ' se guardado correctamente', false);
            });
        } else {
            sendResponce(res, 400, 'El estudiante con dni ' + dni + ' ya existe', true);
        }
    },
        true);
});

app.get('/api/getAllStudent', (req, res) => {
    console.log('request recibido')

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        res.send(JSON.parse(data));
    });
});

app.get('/api/getStudentByDNI/:dni', (req, res) => {
    console.log('request recibido')

    readFile(data => {
        var dni = req.params["dni"];
        var dniPosition = Object.keys(data).indexOf(dni);
        console.log(dniPosition);
        if (dniPosition === -1) {
            sendResponce(res, 404, 'El estudiante con dni ' + dni + ' no existe', true);
        } else {
            res.json(data[dni]);
        }
    },
        true);
});

app.get('/api/getStudentByAgeRage/', (req, res) => {
    console.log('request recibido')

    readFile(data => {
        var ageSince = req.body.ageSince;
        var ageUntil = req.body.ageUntil;
        if (!Number.isInteger(ageSince) || !Number.isInteger(ageUntil)) {
            sendResponce(res, 400, 'Parametros erroneos', true);
        } else {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                let result = [];
                for (let index = 0; index < Object.keys(data).length; index++) {
                    let student = data[Object.keys(data)[index]];
                    if (student.age <= ageSince && student.age >= ageUntil) {
                        result.push(element);
                    }
                }
                res.send(JSON.parse(data));
            });
        }
    },
        true);
});

app.put('/api/updateStudent/:dni', (req, res) => {

    readFile(data => {

        // add the new user
        var dni = req.params["dni"];
        var dniPosition = Object.keys(data).indexOf(dni);
        if (dniPosition === -1) {
            sendResponce(res, 404, 'El estudiante con dni ' + dni + ' no existe', true);
        } else {
            data[dni] = req.body;
        }

        writeFile(JSON.stringify(data, null, 2), () => {
            sendResponce(res, 200, 'El estudiante con dni ' + dni + ' se actualizo correctamente', false);
        });
    },
        true);
});

app.delete('/api/deleteStudent/:dni', (req, res) => {

    readFile(data => {

        // add the new user
        var dni = req.params["dni"];
        var dniPosition = Object.keys(data).indexOf(dni);
        if (dniPosition === -1) {
            sendResponce(res, 404, 'El estudiante con dni ' + dni + ' no existe', true);
        } else {
            delete data[dni];
            writeFile(JSON.stringify(data, null, 2), () => {
                sendResponce(res, 200, 'El estudiante con dni ' + dni + ' se elimino correctamente', false);
            });
        }

    },
        true);
});

function sendResponce(res, code, messaje, error) {
    respuesta = {
        error: error,
        codigo: code,
        mensaje: messaje
    };
    res.status(respuesta.codigo).send(respuesta);
};