const { sequelize, APPOINTMENT } = require('../models')
const { dateParse, today } = require('../constants/date')
const { QueryTypes, or } = require("sequelize");
const {io} = require('../services/socket.io') 

const emitChange = ()=>{
    io().emit('diagnostic-stack-change', {
        room1:room1.getPatientStack(),
        room2:room2.getPatientStack()
    })
}
//status:
// penđing, diagnosing, diagnosed, appointment
class Stack {
    patientStack = Array(50)
    order = 0

    constructor() { }

    changeStack(){
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
        this.patientStack[this.order] = { order: this.order, diagnostic: diagnostic, status: 'penđing' }
        this.changeStack()
        return this.order
    }

    changeStatus(order, status) {
        if (this.patientStack[order] && this.patientStack[order] != 'appointment') {
            this.patientStack[order].status = status
        }
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