import {
  Diagnostic,
  Prescription,
  PrescriptionItem,
} from "../../models/index.js";
import { Request, Response } from "express";

export const updateDiagnosticDT = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let diagnostic = await Diagnostic.findByPk(id);
    if (diagnostic) {
      let prescription = new Prescription({
        doctorId: req.body.DOCTOR_ID,
      });
      await prescription.save();
      let items = req.body.PRESCRIPTION;

      // TODO: update type
      items.map((item: any) => {
        let prescription_item = new PrescriptionItem({
          prescriptionId: prescription.id,
          name: item.DRUG_NAME,
          number: item.NUMBER,
          instruction: item.INSTRUCTION,
        });
        prescription_item.save();
      });

      diagnostic.symptom = req.body.SYMPTOM;
      diagnostic.prescription = prescription.id;
      diagnostic.reExamination = req.body.RE_EXAMINATION;
      await diagnostic.save();
    }
    res.status(200).send("Cập nhật thành công!");
    return;
  } catch (error) {
    console.log(error);

    res.status(500).send("Lỗi sever!");
    return;
  }
};
