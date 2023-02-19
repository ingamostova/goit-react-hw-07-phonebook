import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import { Forma, Input, Label, Error, Btn } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';

const schema = yup.object().shape({
  name: yup.string().min(3, 'Too short!').required(),
  phone: yup.string().phone().required(),
});

const initialValues = {
  name: '',
  phone: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const { name, phone } = values;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contactItem = {
      name,
      phone,
    };
    dispatch(addContact(contactItem));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Forma autoComplete="off">
        <Label htmlFor="name">
          Name
          <Input type="text" name="name" />
          <ErrorMessage name="name" render={msg => <Error>{msg}</Error>} />
        </Label>
        <Label htmlFor="phone">
          Phone Number
          <Input type="tel" name="phone" />
          <ErrorMessage name="phone" render={msg => <Error>{msg}</Error>} />
        </Label>
        <Btn type="submit">Add contact</Btn>
      </Forma>
    </Formik>
  );
};
