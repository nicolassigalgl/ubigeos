var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    fs = require('fs');

app.use('/', router);
app.use(express.static('./'));

function locationObject(code, name, parentCode, parentName) {
    this.code = code;
    this.name = name;
    this.parentCode = parentCode || '-';
    this.parentName = parentName || '-';
}

function codeExist(arr, obj) {
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].code === obj.code) {
            return true;
        }
    }
    return false;
}

router.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});

router.get('/api/ubigeos', function (req, res) {
    var ubigeos = { departamentos: [], provincias: [], distritos: [] };

    fs.readFile('./mock/ubigeos.txt', { encoding: 'utf-8' }, function (err, file) {
        file = file.replace(/[“”]/g, '');
        var fileLine = file.split('\n');
        fileLine.forEach(function (entry) {
            var locations = entry.split('/');
            locations.forEach(function (location, $index) {
                location = location.trim();
                if (typeof location === 'string' && location.length > 0) {
                    var locationArr = location.replace(/\'/g, '').split(/(\d+)/).filter(Boolean);
                    if ($index === 0) {
                        var departamento = new locationObject(locationArr[0], locationArr[1]);
                        if (!codeExist(ubigeos.departamentos, departamento)) {
                            ubigeos.departamentos.push(departamento);
                        }
                    }
                    if ($index === 1) {
                        var parentDepartment = locations[0].replace(/\'/g, '').split(/(\d+)/).filter(Boolean);
                        var provincia = new locationObject(locationArr[0], locationArr[1], parentDepartment[0], parentDepartment[1]);
                        if (!codeExist(ubigeos.provincias, provincia)) {
                            ubigeos.provincias.push(provincia);
                        }
                    }
                    if ($index === 2) {
                        var parentProvince = locations[1].replace(/\'/g, '').split(/(\d+)/).filter(Boolean);
                        var distrito = new locationObject(locationArr[0], locationArr[1], parentProvince[1], parentProvince[2]);
                        if (!codeExist(ubigeos.distritos, distrito)) {
                            ubigeos.distritos.push(distrito);
                        }
                    }
                }
            });
        });
        res.send(ubigeos);
    });
});

app.listen(port);

console.log("listening to port " + port);