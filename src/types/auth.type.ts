export interface IRegisterPatientPayload {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	patient: {
		contactNumber?: string;
	};
}