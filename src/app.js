(function () {
    var ubigeosService = require('ubigeosService');
    ubigeosService.getUbigeos().then(function (data) {
        for (var category in data) {
            createCategoryTable(data[category], category);
        }
    }).catch(function (err) {
        console.log(err);
    });

    function createCategoryTable(category, categoryName) {
        var table = $('<table></table>');
        var thead = $('<thead></thead>');
        thead.append('<tr><td colspan="4" class="table-title">' + categoryName.toUpperCase() + '</td></tr>');
        thead.append('<tr><td>Código</td><td>Nombre</td><td>Codigo Padre</td><td>Descripcion Padre</td></tr>');
        var tbody = $('<tbody></tbody>');
        table.append(thead);        
        category.forEach(function (item) {
            tbody.append('<tr><td>' + item.code + '</td><td>' + item.name + '</td><td>' + item.parentCode + '</td><td>' + item.parentName + '</td></tr>');
        });        
        table.append(tbody);
        $('#ubigeos').append(table);
    }
})();