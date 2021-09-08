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
  const upsertUserMutation = useMutation((userModel: User) => {
    const { id, ...payload } = userModel

    if (userModel.id) {
      return axios.patch(`/users/${userModel.id}`, payload)
    } else {
      return axios.post('/users', payload)
    }
  })

  const { isLoading, isError, data, error, remove } = useQuery('fetchUserById', () => axios(`/users/${props.userId}`), {
    enabled: !!props.userId,
  })

  if (!props.userId) {
    remove()
  }

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error</span>
  }

  const id = data?.data.id ?? null
  const username = data?.data.username ?? ''
  const password = data?.data.password ?? ''
  const role = data?.data.role ?? UserRole.Buyer

  return (
    <div>
      <h2>{data?.data ? `Edit user - ${data?.data.username}` : 'Create user'}</h2>

      <Formik
        enableReinitialize
        initialValues={{ id, username, password, role }}
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
          upsertUserMutation.mutate(model)
          props.onSubmit()
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>
          <Field
            id="username"
            name="username"
            className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <ErrorMessage name="username" component="span" />

          <br />
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            type="password"
            className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <ErrorMessage name="password" component="span" />

          <br />
          <label htmlFor="role">Role</label>
          <Field
            id="role"
            name="role"
            className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />

          <br />
          <button
            type="submit"
            className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default UserForm
