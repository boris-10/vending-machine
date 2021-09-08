import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

import User, { UserRole } from '../../models/User'

interface UserFormProps {
  userId?: number
  onSubmit: () => void
}

function UserForm(props: UserFormProps): JSX.Element {
  const createUserMutation = useMutation((userModel: User) => axios.post('http://localhost:8080/users', userModel))

  const { isLoading, isError, data, error, remove } = useQuery(
    'fetchUserById',
    () =>
      axios(`http://localhost:8080/users/${props.userId}`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjMxMTAzMzQ4fQ.yqitnSBq20KnHZybDi8dRHCbIEQ0P8bH4bed37Fu7fQ',
        },
      }),
    { enabled: !!props.userId }
  )

  if (!props.userId) {
    remove()
  }

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error</span>
  }

  const username = data?.data.username ?? ''
  const password = data?.data.password ?? ''
  const role = data?.data.role ?? UserRole.Buyer

  return (
    <div>
      <h2>{data?.data ? `Edit user - ${data?.data.username}` : 'Create user'}</h2>

      <Formik
        enableReinitialize
        initialValues={{ username, password, role }}
        validate={(model: User) => {
          const errors: { username?: string; password?: string } = {}
          if (!model.username) {
            errors.username = 'Required'
          }
          if (!model.password) {
            errors.password = 'Required'
          }
          return errors
        }}
        onSubmit={(model: User) => {
          createUserMutation.mutate(model)
          props.onSubmit()
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
          <label htmlFor="role">Role</label>
          <Field id="role" name="role" />

          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default UserForm
