import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

import User, { UserRole } from '../../models/User'
import Button from '../atoms/Button'

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

  const { isLoading, isError, data, remove } = useQuery('fetchUserById', () => axios(`/users/${props.userId}`), {
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
      <h1 className="mb-8 text-center">{data?.data ? `Edit user - ${data?.data.username}` : 'Create user'}</h1>

      <div className="flex justify-center">
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
          <Form className="w-96">
            <div className="flex justify-between mb-4">
              <label className="w-24 pt-1" htmlFor="username">
                Username <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-col flex-1 ml-6">
                <Field
                  id="username"
                  name="username"
                  className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage name="username" component="span" className="text-right text-red-600 text-sm" />
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <label className="w-24 pt-1" htmlFor="password">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-col flex-1 ml-6">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage name="password" component="span" className="text-right text-red-600 text-sm" />
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <label className="w-24 pt-1" htmlFor="role">
                Role
              </label>
              <div className="flex flex-col flex-1 ml-6">
                <Field
                  id="role"
                  as="select"
                  name="role"
                  className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                </Field>
              </div>
            </div>

            <Button type="submit" text="Submit" className="w-full mt-4" variation="success" />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default UserForm
