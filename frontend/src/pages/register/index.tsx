import * as formik from 'formik';
import * as forge from 'node-forge';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { gql, useMutation } from '@apollo/client';

import { RegisterResponse } from '../../__generated__/graphql';
import { downloadBinaryStringAsFile } from '../../helpers/downloadData';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const REGISTER = gql`
  mutation RegisterUser($nickname: String!, $password: String!, $public_key: String!) {
    register(nickname: $nickname, password: $password, public_key: $public_key) {
      access_token
      refresh_token
    }
  }
`;

function Register() {
  const { Formik } = formik;

  const [fileData, setFileData] = useState<string>('');

  const navigate = useNavigate();

  const [responseError, setResponseError] = useState<string>('');

  const [register, { error }] = useMutation<{ register: RegisterResponse }>(REGISTER, {
    errorPolicy: 'all',
    update: (cache, { data }) => {
      cache.writeQuery({
        query: REGISTER,
        data: data,
      });
    },
  });

  const schema = yup.object().shape({
    nickname: yup.string().min(8).max(16),
    password: yup.string().min(8),
  });

  const submit = async (payload: any) => {
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

    const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);

    let publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);

    if (fileData) {
      publicKey = fileData;
    }

    if (fileData?.includes('ssh-rsa')) {
      publicKey = fileData.split(' ')[1];
    }

    try {
      const { data } = await register({ variables: { ...payload, public_key: publicKey } });
      if (data?.register.access_token) {
        localStorage.setItem('access_token', data?.register.access_token);
      }

      if (privateKey) {
        downloadBinaryStringAsFile(privateKey, 'privateKey.pem');
      }

      setTimeout(() => navigate('/chats/0'), 1000);
    } catch (e: any) {
      setResponseError(JSON.parse(e?.message).message.message);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    readFileData(file);
  };

  const readFileData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target?.result;
      if (fileData) {
        setFileData(fileData as string);
      }
    };
    reader.readAsText(file);
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
        validationSchema={schema}
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
              <h3 style={{ textAlign: 'center' }}>Registration</h3>
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
            <Form.Group className="w-100">
              <Form.Label style={{ marginTop: 10 }}>PublicKey(RSA)</Form.Label>
              <Form.Control
                type="file"
                required
                name="file"
                onChange={(e) => {
                  handleFileChange(e);
                  handleChange(e);
                }}
                isInvalid={!!errors.file}
              />

              <Form.Text id="passwordHelpBlock" muted>
                If not, public key will be autegenerated
              </Form.Text>

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.file}
              </Form.Control.Feedback>
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
        Already have an account? Log in&nbsp;
        <Link to="/login">here</Link>
      </Form.Text>
    </div>
  );
}

export default Register;

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
