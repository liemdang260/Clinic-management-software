class Patient {

    order = 0
    patientName = ''

    constructor(order, patientName) {
        this.order = order
        this.patientName = patientName
    }


}

class Stack {
    patientStack = []

    constructor() { }
    get getPatientStack() {
        return this.patientStack
    }

    set setPatientStack(stack) {
        this.patientStack = stack
    }

    addPatientToLast(patient) {
        this.patientStack.push(patient)
    }

    swapOrder() { }

}



module.exports = {
    Stack,
    Patient
}