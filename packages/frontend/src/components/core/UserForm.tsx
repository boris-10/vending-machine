import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { UsersContext } from '../../providers/UsersProvider'
import User from '../../models/User'

interface UserFormProps {
  user?: User
  onSubmit: () => void
}

function UserForm(props: UserFormProps): JSX.Element {
  const { upsertUser } = useContext(UsersContext)

  const username = props.user?.username || ''
  const password = props.user?.password || ''
  const deposit = props.user?.deposit || 0
  const role = props.user?.role || 0

  const submit = (userModel: User) => {
    upsertUser(userModel)
    props.onSubmit()
  }

  return (
    <div>
      <Formik
        initialValues={{ username, password, deposit, role }}
        validate={(values: User) => {
          const errors: { username?: string; password?: string } = {}
          if (!values.username) {
            errors.username = 'Required'
          }
          if (!values.password) {
            errors.password = 'Required'
          }
          return errors
        }}
        onSubmit={(values: User) => {
          submit(values)
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
          <label htmlFor="deposit">Deposit</label>
          <Field id="deposit" name="deposit" type="number" />

          <br />
          <label htmlFor="role">Role</label>
          <Field id="role" name="role" type="number" />

          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default UserForm
