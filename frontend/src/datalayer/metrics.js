const Backbone = require('backbone')

const Model = Backbone.Model.extend({
	urlRoot : '/metrics/list',
	idAttribute: 'uuid'
})

const Collection = Backbone.Collection.extend({
	model: Model,
	url: '/metrics/list'
})

module.exports = {
	Model,
	Collection
}