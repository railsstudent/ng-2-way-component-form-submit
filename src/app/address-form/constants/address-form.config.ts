import { Config } from '../../form-field/interfaces/config.interface';

export const ADDRESS_FORM_CONFIG: Record<string, Config> = {
    streetOne: {
      label: "Street 1: ",
      errors: [{ key: 'required', message: 'Street 1 is required' }],
    },
    streetTwo: {
      label: "Street 2: ",
      errors: [{ key: 'required', message: 'Street 2 is required' }],
    },
    city: {
      label: "City: ",
      errors: [
        { key: 'required', message: 'City is required' },
        { key: 'minlength', message: 'City expects minimum 3 characters' }
      ],
    },
    country: {
      label: "Country: ",
      errors: [
        { key: 'required', message: 'Country is required' },
        { key: 'minlength', message: 'Country expects minimum 3 characters' }
      ],
    }
  }