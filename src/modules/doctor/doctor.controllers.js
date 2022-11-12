import database from "../../models/index.js";
const { DIAGNOSTIC, PRESCRIPTION, PRESCRIPTION_ITEM, ROOM } = database;
import stack from "../../static/stack.js";
import moment from "moment";

const controller = () => {
  const getRoom = async (req, res) => {
    try {
      let room = await ROOM.findOne({
        attributes: ["ROOM_ID"],
        where: {
          DOCTOR_ID: req.userInfo.employee_id,
        },
      });
      console.log(room.ROOM_ID);
      if (room) {
        // return res.json(room.ROOM_ID)
        return res.json({
          room: room.ROOM_ID,
          QUEUE:
            room.ROOM_ID == 1
              ? stack.room1.getPatientStack()
              : stack.room2.getPatientStack(),
        });
      }
      return res.status(404).send("Không tìm thấy phòng của bác sĩ này");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const updateDiagnosticDT = async (req, res) => {
    console.log(req.body);
    try {
      let id = req.body.id;
      let diagnostic = await DIAGNOSTIC.findOne({
        where: { DIAGNOSTIC_ID: id },
      });
      if (diagnostic) {
        let prescription = new PRESCRIPTION({
          DOCTOR_ID: req.userInfo.employee_id,
          CREATE_AT: moment.utc(req.body.CREATE_AT, "DD/MM/YYYY h:mm:ss"),
        });
        await prescription.save();
        let items = req.body.PRESCRIPTION;
        items.map(async (item) => {
          let prescription_item = new PRESCRIPTION_ITEM({
            PRESCRIPTION_ID: prescription.PRESCRIPTION_ID,
            DRUG_NAME: item.DRUG_NAME,
            NUMBER: item.NUMBER,
            INSTRUCTION: item.INSTRUCTION,
          });
          await prescription_item.save();
        });
        diagnostic.SYMPTOM = req.body.SYMPTOM;
        diagnostic.PRESCRIPTION = prescription.PRESCRIPTION_ID;
        // diagnostic.RE_EXAMINATION = req.body.RE_EXAMINATION
        diagnostic.PULSE = req.body.PULSE;
        diagnostic.DIAGNOSTIC = req.body.DIAGNOSTIC;
        diagnostic.BLOOD_PRESSURE = req.body.BLOOD_PRESSURE;
        diagnostic.TEMPERATURE = req.body.TEMPERATURE;
        diagnostic.TEMPERATURE = 3;
        await diagnostic.save();
      }
      //UPDATE STATUS HANG DOI
      if (req.body.pnum == 1) {
        stack.room1.changeStatus(req.body.pnum, "diagnosed");
      } else {
        stack.room2.changeStatus(req.body.pnum, "diagnosed");
      }
      return res.status(200).send("Cập nhật thành công!");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getStackByRoom = (req, res) => {};

  return {
    getRoom,
    updateDiagnosticDT,
    getStackByRoom,
  };
};

export default controller();
