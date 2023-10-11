import { Config } from '../../form-field/interfaces/config.interface';

export const USER_FORM_CONFIG: Record<string, Config> = {
    firstName: {
      label: "First Name: ",
      errors: [{ key: 'required', message: 'First name is required' }],
    },
    lastName: {
      label: "Last Name: ",
      errors: [{ key: 'required', message: 'Last name is required' }],
    },
}