
exports.empty = function() {
    return [0, 0, 0, 0, 0, 0, 0, 0];
};

exports.matrix = function(matrix) {
    return matrix.map(function(row, index) {
        if (row.split) {
            row = row.split('').map(function(val) { return val != ' ' ? 1 : 0 });
        }
        return calculateRowBitmap(row);
    });
};

exports.matrices = function(data) {
    var count = data.length / 8;
    var res = [];
    var matrixIndex = 0;
    var i = 0;
    for (matrixIndex = 0; matrixIndex < count; ++matrixIndex) {
        var verticalSlices = [];
        for (i = 0; i < 8; ++i) {
            verticalSlices.push(data[i * count + matrixIndex]);
        }
        res.push(exports.matrix(verticalSlices));
    }
    return res;
}

exports.difference = function(bmp1, bmp2) {
    return bmp1.map(function(b, index) {
        return (bmp1[index] == bmp2[index]) ? null : bmp2[index];
    });
};

exports.shiftRow = function(val, offset) {
    if (offset > 0) {
        return (val >> offset) & 0xff;
    } else {
        return (val << (-offset)) & 0xff;
    }
};

exports.shift = function(bitmap, offset) {
    return bitmap.map(function(b) {
        return exports.shiftRow(b, offset);
    });
};

exports.union = function(bmp1, bmp2) {
    return bmp1.map(function(b, index) {
        return bmp1[index] | bmp2[index];
    });
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
