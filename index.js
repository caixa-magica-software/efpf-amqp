const mqtt = require('mqtt')

class MqttPubSub {

    constructor(config, options) {
        this.protocol = config.ssl ? 'mqtts' : 'mqtt'
        this.host = config.host ? config.host : 'localhost'
        this.port = config.port ? config.port : ( config.ssl ? '8883' : '1883')
        this.url = config.url ? config.url : this.protocol + '://' + this.host + ':' + this.port
        this.client = mqtt.connect(this.url, options)
        this.client.on('error', (err) => console.log(err));
        
    }

    sendMessage(topic, message) {
        this.client.on('connect', () => {
            this.client.publish(topic, message)
        })
    }

    receiveMessage(callback) {
        this.client.on('message', (topic, message) => {
            callback(topic, message)
        })
    }

    registerListenerOnTopic(topic) {
        this.client.on('connect', () => {
            this.client.subscribe(topic)
        })
    }

    unregisterListenerOnTopic(topics, options) {
        this.client.unsubscribe(topics, options)
    }

    isConnected() {
        return this.client.connected
    }

    close() {
        this.client.end()
    }

}

module.exports = MqttPubSub