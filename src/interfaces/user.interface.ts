export interface UpdateProfileRequest {
  employeeName?: string;
  identityNumber?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  employeeAddress?: string;
  positionId?: number;
}

export interface ChangePasswordRequest {
  oldPass: string;
  newPass: string;
}

