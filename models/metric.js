const db = require('../lib/db')
const Schema = require('mongoose').Schema
const v4 = require('node-uuid').v4
const _ = require('underscore')

const MetricSchema = new Schema({
	data: Schema.Types.Mixed,
	date: { type: Date, default: Date.now }
})

const Metric = db.model('Metric', MetricSchema)

module.exports = Metric