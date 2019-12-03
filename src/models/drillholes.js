const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const { DEFAULT_SEARCH_FIELD } = require('../utils/constants');

const schema = new mongoose.Schema({
    holesId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    latitude: {
        type: Number,
        required: true,         
    },
    longitude: {
        type: Number,
        required: true, 
    },
    dip: {
        type: Number,
        required: true, 
    },
    azimuth: {
        type: Number,
        required: true, 
    },    
    depthReading: [
        {
            depth: Number,
            dip: Number,
            azimuth: Number,
        }, 
    ],   
},
    );

schema.statics.searchByFilters = async function (searchField, searchValue, pageRequested, pageSize, sortType, sortValue) {
    if (isNaN(pageSize) || parseInt(pageSize) <= 0) {
        return 'pageSize is invalid';
    }
    if (isNaN(pageRequested) || parseInt(pageRequested) <= 0) {
        return 'pageRequested is invalid';
    }
    if (parseInt(sortValue) !== 1 && parseInt(sortValue) !== -1) {
        return 'sortValue is invalid';
    }

    let query;
    if (!searchField || searchField === DEFAULT_SEARCH_FIELD) {
        query = this.find();
    } else {
        query = this.find({ [searchField]: new RegExp(searchValue, 'i') });
    }

    const data = await query.skip((parseInt(pageRequested) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .sort({ [sortType]: parseInt(sortValue) })
        .exec();

    return data;
}

const model = mongoose.model('Hole', schema);

module.exports = model;