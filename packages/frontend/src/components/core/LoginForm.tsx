import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

interface LoginModel {
  username: string
  password: string
}

function LoginForm(): JSX.Element {
  const login = (loginModel: LoginModel) => {
    console.log(loginModel.username)
  }

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={(values) => {
          const errors: { username?: string; password?: string } = {}
          if (!values.username) {
            errors.username = 'Required'
          }
          if (!values.password) {
            errors.password = 'Required'
          }
          return errors
        }}
        onSubmit={(values) => {
          login(values)
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
