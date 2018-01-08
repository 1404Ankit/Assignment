import * as del from 'del';
import * as List from 'listjs';

const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

interface ListCollection {
}

// noinspection JSAnnotator
const loadCollection = function (colName, db: List): Promise<ListCollection<any>> {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        })
    });
}

const cleanFolder = function (folderPath) {
    // delete files inside folder but not the folder itself
    // noinspection TypeScriptValidateTypes
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

export { imageFilter, loadCollection, cleanFolder }