var React = require('react')
var ReactDOM = require('react-dom')
var request = require('browser-request')

var Metrics = require('./datalayer/metrics') 
 
const ListView = React.createClass({
	getInitialState: function(){
		return {
			metrics: []
		}
	},
	componentDidMount: function(){
		var self = this
		this.collection = new Metrics.Collection()
		this.binder = function() {
			self.setState({metrics: self.collection.toArray() })
		}

		this.collection.on('add', this.binder)
		this.collection.on('remove', this.binder)

		this.collection.fetch().then(function (data) {
			self.collection.add(data)
		})

		window.socket.on('new-metric', function(metric){
			self.collection.add(metric)
		})
	},
	render: function() {
		var list = this.state.metrics.map(function(model, i){
			var metric = model.toJSON()
			var data = JSON.stringify(metric.data)
			return <div key={i}>
				<div><b> {metric.date} : </b> <pre>{data}</pre></div>
			</div>
		})


		return <div>{list}</div>
	}
})
 
ReactDOM.render(<ListView/>, document.getElementById('content'))