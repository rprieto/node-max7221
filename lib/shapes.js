var bitmap = require('./bitmap');

module.exports = {

    'arrow': bitmap.fromStrings([
        '    1   ',
        '    11  ',
        '    111 ',
        '11111111',
        '11111111',
        '    111 ',
        '    11  ',
        '    1   '
    ]),
    'square': bitmap.fromStrings([
        '11111111',
        '11111111',
        '11    11',
        '11    11',
        '11    11',
        '11    11',
        '11111111',
        '11111111'
    ]),
    'diamond': bitmap.fromStrings([
        '   11   ',
        '  1111  ',
        ' 11  11 ',
        '11    11',
        '11    11',
        ' 11  11 ',
        '  1111  ',
        '   11   '
    ])

};
