radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        ref_alt = SW01.pressureAltitude(Length.Meter)
        radio.sendString("klar")
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P0, 0)
    } else {
        if (receivedNumber == 2) {
            while (receivedNumber == 2) {
                pins.digitalWritePin(DigitalPin.P0, 1)
                new_alt = SW01.pressureAltitude(Length.Meter)
                alt = new_alt - ref_alt
                acc = input.acceleration(Dimension.Strength)
                temp = BMP280.temperature()
                basic.pause(100)
                pins.digitalWritePin(DigitalPin.P0, 0)
                serial.writeNumber(temp)
                serial.writeLine("")
                radio.sendValue("temp", temp)
                radio.sendValue("acc", acc)
                radio.sendValue("alt", alt)
            }
        }
    }
})
let temp = 0
let acc = 0
let alt = 0
let new_alt = 0
let ref_alt = 0
radio.setGroup(1)
basic.showString("raket")
input.setAccelerometerRange(AcceleratorRange.EightG)
radio.setTransmitPower(7)
