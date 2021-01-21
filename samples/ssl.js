const MqttPubSub = require('../index.js')

const mqtt = new MqttPubSub({ ssl: true, host: 'broker.emqx.io' })

const topic = 'myTestTopic'
const message = 'myTestMessage'

mqtt.registerListenerOnTopic('myTestTopic')
mqtt.receiveMessage((topic, message) => {
    console.log('topic ', topic)
    console.log('message ', message.toString())
    mqtt.close()
})
mqtt.sendMessage(topic, message)