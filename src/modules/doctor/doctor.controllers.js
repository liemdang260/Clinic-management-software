
const { DIAGNOSTIC, PRESCRIPTION, PRESCRIPTION_ITEM } = require('../../models')
const moment = require('moment')

exports.updateDiagnosticDT = async (req, res) => {
    try {
        let id = req.params.id
        let diagnostic = await DIAGNOSTIC.findOne({
            where: { DIAGNOSTIC_ID: id }
        })
        if (diagnostic) {
            let prescription = new PRESCRIPTION({
                DOCTOR_ID: req.body.DOCTOR_ID,
                CREATE_AT: moment.utc(req.body.CREATE_AT, 'DD/MM/YYYY h:mm:ss')
            })
            await prescription.save()
            let items = req.body.PRESCRIPTION
            items.map(item => {
                let prescription_item = new PRESCRIPTION_ITEM({
                    PRESCRIPTION_ID:  prescription.PRESCRIPTION_ID,
                    DRUG_NAME: item.DRUG_NAME,
                    NUMBER: item.NUMBER,
                    INSTRUCTION: item.INSTRUCTION,
                })
                prescription_item.save()
            })
            diagnostic.SYMPTOM = req.body.SYMPTOM,
            diagnostic.PRESCRIPTION = prescription.PRESCRIPTION_ID,
            diagnostic.RE_EXAMINATION = req.body.RE_EXAMINATION
            await diagnostic.save()
        }
        return res.status(200).send('Cập nhật thành công!')
    } catch (error) {
        console.log(error)
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}