const MqttPubSub = require('../index.js')
const fs = require('fs')

const caFile = fs.readFile('./cacert.pem')

// THIS SAMPLE IS NOT FUNCTIONAL WITH THIS HOST
const mqtt = new MqttPubSub({ host: 'broker.emqx.io' }, {
    ca: [ caFile ]
})

const topic = 'myTestTopic'
const message = 'myTestMessage'

mqtt.registerListenerOnTopic('myTestTopic')
mqtt.receiveMessage((topic, message) => {
    console.log('topic ', topic)
    console.log('message ', message.toString())
    mqtt.close()
})
mqtt.sendMessage(topic, message)