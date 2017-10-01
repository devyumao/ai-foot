var path = require('path');

function root(p) {
    return path.join(__dirname, '..', p);
}

module.exports = {
    root: root,
    SRC_PATH: root('src'),
    BIN_PATH: root('bin'),
    PHASER_PATH: root('node_modules/phaser')
};
