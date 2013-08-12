var bitmap = require('../bitmap');

module.exports = {

    0: bitmap.fromStrings([
        '        ',
        '  1111  ',
        ' 11  11 ',
        ' 11  11 ',
        ' 11  11 ',
        ' 11  11 ',
        '  1111  ',
        '        '
    ]),
    1: bitmap.fromStrings([
        '        ',
        '   11   ',
        '   11   ',
        '   11   ',
        '   11   ',
        '   11   ',
        '   11   ',
        '        '
    ]),
    2: bitmap.fromStrings([
        '        ',
        '  1111  ',
        ' 1   11 ',
        '    11  ',
        '   11   ',
        '  11    ',
        ' 111111 ',
        '        '
    ]),
    3: bitmap.fromStrings([
        '        ',
        ' 11111  ',
        '     11 ',
        '   1111 ',
        '     11 ',
        '     11 ',
        ' 11111  ',
        '        '
    ]),
};
