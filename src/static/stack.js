const { sequelize, APPOINTMENT } = require('../models')
const { dateParse, today } = require('../constants/date')
const { QueryTypes, or } = require("sequelize");
const { io } = require('../services/socket.io')

const emitChange = () => {
    io().emit('diagnostic-stack-change', {
        room1: room1.getPatientStack(),
        room2: room2.getPatientStack()
    })
}
//status:
// pending, diagnosing, diagnosed, appointment
class Stack {
    patientStack = Array(50)
    order = 0

    constructor() { }

    changeStack() {
        emitChange()
    }

    getPatientStack() {
        return this.patientStack.filter((item) => {
            if (item != null && item.status != 'appointment' && item.status != 'diagnosed') {
                return item
            }
        })
    }

    addPatientToLast(diagnostic) {
        this.order++
        while (this.patientStack[this.order]) {
            this.order++
        }
        this.patientStack[this.order] = { order: this.order, diagnostic: diagnostic, status: 'pending', time: new Date() }
        this.changeStack()
        return this.order
    }

    changeTime(pnum, time) {

    }
    changeStatus(order, status) {
        // if (this.patientStack[order] && this.patientStack[order] != 'appointment') {
        //     this.patientStack[order].status = status
        // }
        
        console.log(order, status)
        for (let i = 0; i < this.patientStack.length; i++) {
            if (this.patientStack[i] != null && this.patientStack[i].status != 'appointment' && this.patientStack[i].status != 'diagnosed') {
                if (this.patientStack[i].order == order) {
                    this.patientStack[i].status = status
                    console.log(this.patientStack[i])
                    break;
                }
            }
        }
        console.log(this.getPatientStack())
        this.changeStack()
    }

    async initAppointment() {
        let appointmentToday = await sequelize.query(`select * from appointment WHERE CONVERT(VARCHAR(10), TIMES, 103) = ?`,
            {
                replacements: [dateParse(new Date())],
                type: QueryTypes.SELECT
            })
        appointmentToday.map(appointment => {
            let date = new Date()
            date.setHours(appointment.TIMES.getUTCHours())
            date.setMinutes(appointment.TIMES.getUTCMinutes())
            date.setSeconds(appointment.TIMES.getUTCSeconds())
            this.patientStack[(date.getTime() - today()) / 900000] = { appointment, status: 'appointment' }
        })
        this.changeStack()
    }

    swapOrder() { }

}

const room1 = new Stack()
const room2 = new Stack()

module.exports = {
    room1,
    room2
}