const Router = require('koa-router')
const co = require('co')

const Metric = require('../models/metric')

const metricsRouter = Router()

metricsRouter.get('/', co.wrap(function *(ctx, next) {
	yield ctx.render('public/webpack',{
		title:'Metrics list',
		src:'/build/metrics.js'
	})	
}))

metricsRouter.get('/list', co.wrap(function *(ctx, next) {
	const metrics = yield Metric.find()

	ctx.body = metrics
}))

metricsRouter.get('/add', co.wrap(function *(ctx, next) {
	if(!ctx.request.query){
		return ctx.throw(403)
	}

	const metric = yield Metric.create({
		data: ctx.request.query
	})

	ctx.app.io.emit('new-metric', metric.toJSON() )
	ctx.body = metric.toJSON()
}))

module.exports = metricsRouter
