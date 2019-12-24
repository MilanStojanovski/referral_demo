const getDocuments = (Collection, filter) =>
    new Promise((resolve, reject) => {
        Collection.find(filter.find)
            .skip(filter.skip || 0)
            .limit(filter.limit || 0)
            .sort(filter.sort || { updatedAt: -1, createdAt: -1 })
            .exec((err, documents) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(documents);
            });
    });

const getDocumentsWithAggregation = (Collection, filter) =>
    new Promise((resolve, reject) => {
        Collection.aggregate(filter.aggregate).exec((err, documents) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(documents);
        });
    });

const getDocument = (Collection, find) =>
    new Promise((resolve, reject) => {
        Collection.findOne(find, (err, document) => {
            if (err) {
                reject(err);
                return;
            }
            if (!document) {
                reject(
                    new Error(
                        "A document with the given attributes doesn't exist."
                    )
                );
                return;
            }

            resolve(document);
        });
    });

const getDocumentById = (Collection, id) =>
    new Promise((resolve, reject) => {
        Collection.findById(id, (err, document) => {
            if (err) {
                reject(err);
                return;
            }
            if (!document) {
                reject(
                    new Error("A document with the given id doesn't exist.")
                );
                return;
            }

            resolve(document);
        });
    });

const saveSingleDocument = (Collection, document) =>
    new Promise((resolve, reject) => {
        const doc = new Collection(document);
        doc.save((err, res) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(res);
        });
    });

const saveDocuments = (Collection, documents) =>
    new Promise((resolve, reject) => {
        Collection.insertMany(documents, (err, docs) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(docs);
        });
    });

const upsertSingleDocument = (Collection, data, find) =>
    new Promise((resolve, reject) => {
        Collection.update(
            find,
            data,
            { upsert: true, setDefaultsOnInsert: true },
            (err, doc) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(doc);
            }
        );
    });

const updateSingleDocument = (Collection, id, data) =>
    new Promise((resolve, reject) => {
        Collection.findByIdAndUpdate(id, data, { new: true }, (err, doc) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(doc);
        });
    });

const deleteDocumentById = (Collection, id) =>
    new Promise((resolve, reject) => {
        Collection.findByIdAndRemove(id, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(res);
        });
    });

const deleteDocument = (Collection, find) =>
    new Promise((resolve, reject) => {
        Collection.findOneAndRemove(find, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(res);
        });
    });

const deleteDocumentsByField = (Collection, id, field) =>
    new Promise((resolve, reject) => {
        Collection.findById(id, (err, doc) => {
            if (err) {
                reject(err);
            } else if (!doc) {
                reject(
                    new Error("A document with the given id doesn't exist.")
                );
            }

            const find = {};
            find[field] = doc[field];
            Collection.remove(find, (removeErr, res) => {
                if (removeErr) {
                    reject(removeErr);
                }

                resolve(res);
            });
        });
    });

module.exports = {
    getDocuments,
    getDocumentsWithAggregation,
    getDocument,
    getDocumentById,
    saveSingleDocument,
    saveDocuments,
    upsertSingleDocument,
    updateSingleDocument,
    deleteDocumentById,
    deleteDocument,
    deleteDocumentsByField
};
