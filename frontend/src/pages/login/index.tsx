import * as formik from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { gql, useMutation } from '@apollo/client';

import { LoginResponse } from '../../__generated__/graphql';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const LOGIN = gql`
  mutation LoginUser($nickname: String!, $password: String!) {
    login(nickname: $nickname, password: $password) {
      access_token
      refresh_token
    }
  }
`;

function Login() {
  const { Formik } = formik;

  const [fileData, setFileData] = useState<string>('');

  const navigate = useNavigate();

  const [responseError, setResponseError] = useState<string>('');

  const [login, { error }] = useMutation<LoginResponse>(LOGIN, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: LOGIN,
        data: data,
      });
    },
  });

  const submit = async (payload: any) => {
    try {
      await login({ variables: payload });
      navigate('/chats');
    } catch (e: any) {
      setResponseError(JSON.parse(e?.message).message.message);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Formik
        onSubmit={submit}
        initialValues={{
          nickname: '',
          password: '',
          file: null,
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid silver',
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Form.Group className="w-100" controlId="validationFormikUsername2">
              <h3 style={{ textAlign: 'center' }}>Login</h3>
            </Form.Group>
            <Form.Group className="w-100" controlId="validationFormikUsername2">
              <Form.Label>Nickname</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Nickname"
                  name="nickname"
                  value={values.nickname}
                  onChange={handleChange}
                  isInvalid={!!errors.nickname}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.nickname}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="w-100" controlId="validationFormikPassword">
              <Form.Label style={{ marginTop: 10 }}>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="w-100" style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <Button type="submit">Register</Button>
            </Form.Group>
            <Form.Text className="text-danger" style={responseError ? { display: 'block' } : { display: 'none' }}>
              {responseError}
            </Form.Text>
          </Form>
        )}
      </Formik>
      <Form.Text id="passwordHelpBlock2" muted>
        Don't have an account? Register
        <Link to="/register"> here</Link>
      </Form.Text>
    </div>
  );
}

export default Login;

// const [formData, setFormData] = useState({
//     nickname: '',
//     password: '',
//     public_key: '123123123',
// });
//
// const [register, { data, loading, error }] = useMutation(REGISTER, { errorPolicy: 'all' });
// if (error) return <div>Erroe</div>;
//
// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
// };
//
// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//
//     const res = await register({ variables: formData });
//     console.log(res);
//     // Handle form submission here, e.g., send data to an API
//     console.log('Form Data:', formData);
// };
