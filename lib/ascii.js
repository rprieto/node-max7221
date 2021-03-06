var bitmap = require('./bitmap');

exports.symbols = {};

exports.text = function(str) {
    return str.split('').map(function(s) {
        return exports.symbols[s];
    });
}

function loadWithId(symbols, data) {
    var matrices = bitmap.matrices(data);
    symbols.forEach(function(id, i) {
        exports.symbols[id] = matrices[i];
    });
}

loadWithId(['0','1','2','3','4','5','6','7','8','9'],
    [
        '        ','        ','        ','        ','        ','        ','        ','        ','        ','        ',
        '  1111  ','   11   ','  1111  ',' 11111  ',' 11  11 ',' 111111 ','  1111  ',' 111111 ','  1111  ','  11111 ',
        ' 11  11 ','   11   ',' 1   11 ','     11 ',' 11  11 ',' 11     ',' 11     ',' 11  11 ',' 11  11 ',' 11  11 ',
        ' 11  11 ','   11   ','    11  ','   1111 ',' 11  11 ',' 11111  ',' 11111  ','     11 ','  1111  ',' 11  11 ',
        ' 11  11 ','   11   ','   11   ','     11 ',' 111111 ','     11 ',' 11  11 ','     11 ',' 11  11 ','  11111 ',
        ' 11  11 ','   11   ','  11    ','     11 ','     11 ','     11 ',' 11  11 ','     11 ',' 11  11 ','     11 ',
        '  1111  ','   11   ',' 111111 ',' 11111  ','     11 ',' 11111  ','  1111  ','     11 ','  1111  ','     11 ',
        '        ','        ','        ','        ','        ','        ','        ','        ','        ','        ',
    ]);


loadWithId(['a','b','c','d','e','f','g'],
    [
        '  1111  ',' 11111  ','  1111  ',' 1111   ',' 111111 ',' 111111 ','  11111 ',
        ' 111111 ',' 11  11 ',' 111111 ',' 11 11  ',' 11     ',' 111111 ',' 111111 ',
        ' 11  11 ',' 11  11 ',' 11  11 ',' 11  11 ',' 11     ',' 11     ',' 11     ',
        ' 11  11 ',' 11111  ',' 11     ',' 11  11 ',' 11111  ',' 1111   ',' 11     ',
        ' 111111 ',' 11111  ',' 11     ',' 11  11 ',' 11111  ',' 1111   ',' 11  111',
        ' 111111 ',' 11  11 ',' 11  11 ',' 11  11 ',' 11     ',' 11     ',' 11   11',
        ' 11  11 ',' 11  11 ',' 111111 ',' 11 11  ',' 11     ',' 11     ',' 1111111',
        ' 11  11 ',' 11111  ','  1111  ',' 1111   ',' 111111 ',' 11     ','  11111 ',
    ]);

loadWithId(['h','i','j','k','l','m','n'],
    [
        ' 11  11 ','   11   ','     11 ',' 11   11',' 11     ','1111111 ','111111  ',
        ' 11  11 ','   11   ','     11 ',' 11  11 ',' 11     ','11111111','1111111 ',
        ' 11  11 ','   11   ','     11 ',' 11 11  ',' 11     ','11 11 11','11    11',
        ' 111111 ','   11   ','     11 ',' 1111   ',' 11     ','11 11 11','11    11',
        ' 111111 ','   11   ',' 11  11 ',' 1111   ',' 11     ','11 11 11','11    11',
        ' 11  11 ','   11   ',' 11  11 ',' 11 11  ',' 11     ','11 11 11','11    11',
        ' 11  11 ','   11   ',' 111111 ',' 11  11 ',' 111111 ','11 11 11','11    11',
        ' 11  11 ','   11   ','  1111  ',' 11   11',' 111111 ','11 11 11','11    11',
    ]);

loadWithId(['o','p','q','r','s','t','u'],
    [
        '  1111  ',' 11111  ','  11111 ',' 11111  ','   1111 ',' 111111 ',' 11  11 ',
        ' 111111 ',' 111111 ',' 111111 ',' 111111 ',' 111111 ',' 111111 ',' 11  11 ',
        ' 11  11 ',' 11  11 ',' 11  11 ',' 11  11 ',' 11     ','   11   ',' 11  11 ',
        ' 11  11 ',' 11  11 ',' 11  11 ',' 11  11 ',' 11111  ','   11   ',' 11  11 ',
        ' 11  11 ',' 111111 ',' 111111 ',' 11111  ','  11111 ','   11   ',' 11  11 ',
        ' 11  11 ',' 11111  ','  11111 ',' 11  11 ','     11 ','   11   ',' 11  11 ',
        ' 111111 ',' 11     ','     11 ',' 11  11 ',' 111111 ','   11   ',' 111111 ',
        '  1111  ',' 11     ','     11 ',' 11  11 ',' 11111  ','   11   ','  1111  ',
    ]);

loadWithId(['v','w','x','y','z'],
    [
        '11    11','11    11',' 11  11 ',' 11  11 ',' 111111 ',
        '11    11','11    11',' 11  11 ',' 11  11 ',' 111111 ',
        '11    11','11    11','  1111  ',' 11  11 ','     11 ',
        '11    11','11    11','   11   ','  1111  ','    11  ',
        '11    11','11 11 11','   11   ','   11   ','  11    ',
        ' 11  11 ','11 11 11','  1111  ','   11   ',' 11     ',
        '  1111  ','11111111',' 11  11 ','   11   ',' 111111 ',
        '   11   ',' 11  11 ',' 11  11 ','   11   ',' 111111 ',
    ]);

loadWithId(['.',',','?','!','-','+','='],
    [
        '        ','        ','  1111  ','   11   ','        ','        ','        ',
        '        ','        ',' 11  11 ','   11   ','        ','        ','        ',
        '        ','        ','     11 ','   11   ','        ','        ','        ',
        '        ','        ','    11  ','   11   ','        ','   11   ',' 111111 ',
        '        ','        ','   11   ','   11   ',' 111111 ',' 111111 ','        ',
        '   111  ','   111  ','   11   ','   11   ','        ','   11   ',' 111111 ',
        '   111  ','   111  ','        ','        ','        ','        ','        ',
        '        ','  11    ','   11   ','   11   ','        ','        ','        ',
    ]);
