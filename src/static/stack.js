
class Stack {
    patientStack = []
    order = 1

    constructor() { }
    get getPatientStack() {
        return this.patientStack
    }

    set setPatientStack(stack) {
        this.patientStack = stack
    }

    addPatientToLast(diagnostic,patient) {
        this.patientStack.push({order:this.order, diagnostic:diagnostic,patient:patient})
        this.order++
    }

    swapOrder() { }

}

const room1 = new Stack()
const room2 = new Stack()

module.exports = {
    room1,
    room2
}