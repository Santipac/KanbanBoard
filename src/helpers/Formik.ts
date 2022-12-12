import * as Yup from 'yup';
interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
}
export const yupRegister = Yup.object({
  name: Yup.string()
    .min(2, 'Ingrese un nombre con al menos 2 caracteres')
    .required('El nombre es requerido'),
  email: Yup.string().email('Email Inválido').required('El email es requerido'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmedPassword: Yup.string().when('password', {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Las contraseñas deben ser iguales'
    ),
  }),
});
export const initialRegister: IRegister = {
  name: '',
  email: '',
  password: '',
  confirmedPassword: '',
};
