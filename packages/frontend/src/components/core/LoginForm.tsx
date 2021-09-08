import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

interface LoginModel {
  username: string
  password: string
}

function LoginForm(): JSX.Element {
  const loginMutation = useMutation((loginModel: LoginModel) =>
    axios.post('http://localhost:8080/auth/login', loginModel)
  )

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ username: '', password: '' }}
        validate={(model) => {
          const errors: { username?: string; password?: string } = {}
          if (!model.username) {
            errors.username = 'Required'
          }
          if (!model.password) {
            errors.password = 'Required'
          }
          return errors
        }}
        onSubmit={(model) => {
          loginMutation.mutate(model)
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" />
          <ErrorMessage name="username" component="span" />

          <br />
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />
          <ErrorMessage name="password" component="span" />

          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
