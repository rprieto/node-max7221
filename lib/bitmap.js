
exports.empty = function() {
    return [1, 2, 3, 4, 5, 6, 7, 8].forEach(function(i) {
        return {
            row: i,
            bitmask: 0
        }
    });
};

exports.fromMatrix = function(matrix) {
    return matrix.map(function(row, index) {
        return {
            row: index + 1,
            bitmask: calculateRowBitmap(row)
        };
    });
};

exports.fromStrings = function(array) {
    return array.map(function(row, index) {
        var asNumbers = row.split('').map(function(val) { return val != ' ' ? 1 : 0 });
        return {
            row: index + 1,
            bitmask: calculateRowBitmap(asNumbers)
        };
    });
};

exports.difference = function(bitmap1, bitmap2) {
    var rows = [];
    for (var i = 0; i < bitmap1.length; ++i) {
        if (bitmap1[i].bitmask != bitmap2[i].bitmask) {
            rows.push(bitmap2[i])
        }
    }
    return rows;
};

function calculateRowBitmap(row) {
    return (row[0] ? 128 : 0) | 
           (row[1] ?  64 : 0) |
           (row[2] ?  32 : 0) |
           (row[3] ?  16 : 0) |
           (row[4] ?   8 : 0) |
           (row[5] ?   4 : 0) |
           (row[6] ?   2 : 0) |
           (row[7] ?   1 : 0);
}
