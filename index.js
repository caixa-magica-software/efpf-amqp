const mqtt = require('mqtt')

class MqttPubSub {

    constructor(config, options, autoConnect = true, debug = false) {
        this.protocol = config.ssl ? 'mqtts' : 'mqtt'
        this.host = config.host ? config.host : 'localhost'
        this.port = config.port ? config.port : ( config.ssl ? '8883' : '1883')
        this.url = config.url ? config.url : this.protocol + '://' + this.host + ':' + this.port
        this.client = mqtt.connect(this.url, options)
        this.client.on('error', (err) => console.log('error ', err));
        this.client.on('packetsend', (packet) => { if(debug) console.log('packet send ', packet) })
        this.client.on('packetreceive', (packet) => { if(debug) console.log('packet receive ', packet) })
        this.client.on('disconnect', (packet) => { if(debug) console.log('disconnect', packet) } )   
        if(autoConnect) this.client.on('connect ', (ack) => { if(debug) console.log('connect ', ack) })
    }

    connect(callback) {
        this.client.on('connect', (ack) => callback(ack))
    }

    disconnect(callback) {
        this.client.on('disconnect', (packet) => callback(packet))
    }

    sendMessage(topic, message) {
        this.client.publish(topic, message)
    }

    receiveMessage(callback) {
        this.client.on('message', (topic, message) => {
            callback(topic, message)
        })
    }

    registerListenerOnTopic(topic) {
        this.client.subscribe(topic)
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