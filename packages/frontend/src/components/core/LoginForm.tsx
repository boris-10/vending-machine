import React, { useContext } from 'react'
import { useMutation } from 'react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { AuthContext } from '../../providers/AuthProvider'

interface LoginModel {
  username: string
  password: string
}

interface LoginFormProps {
  onLoginSuccess: () => void
}

function LoginForm(props: LoginFormProps): JSX.Element {
  const { login } = useContext(AuthContext)

  const loginMutation = useMutation(async (loginModel: LoginModel) => {
    try {
      await login(loginModel.username, loginModel.password)
      props.onLoginSuccess()
    } catch (error) {
      throw error
    }
  })

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
