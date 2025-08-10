export interface PatientInfo {
  patientName: string;
  identityNumber: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
}

export interface AppointmentInfo {
  doctorId: number;
  time: string;
}

export interface AppointmentRequestPayload {
  patient: PatientInfo;
  appointment: AppointmentInfo;
}

