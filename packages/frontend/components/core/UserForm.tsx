import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import Button from '../../components/atoms/Button'

import User, { UserRole } from '../../models/User'

interface UserFormProps {
  userId?: number
  onSubmit: () => void
  onDelete?: () => void
}

const UserForm = (props: UserFormProps): JSX.Element => {
  const { data, remove } = useQuery('fetchUserById', () => axios(`/users/${props.userId}`), {
    enabled: !!props.userId,
  })

  if (!props.userId) {
    remove()
  }

  const updateUserMutation = useMutation((user: User) => {
    const { id, ...payload } = user

    if (id) {
      return axios.patch(`/users/${id}`, payload)
    } else {
      return axios.post('/users', payload)
    }
  })

  const deleteUserMutation = useMutation((id: number) => axios.delete(`/users/${id}`))

  const initialValues = {
    id: null,
    username: '',
    password: '',
    role: UserRole.Buyer,
  }

  const updatedValues = {
    id: data?.data.id ?? null,
    username: data?.data.username ?? '',
    password: data?.data.password ?? '',
    role: data?.data.role ?? UserRole.Buyer,
  }

  return (
    <div>
      <h1 className="mb-8 text-center">{data?.data ? `Edit user - ${data?.data.username}` : 'Create user'}</h1>
      <div className="flex justify-center">
        <Formik
          enableReinitialize
          initialValues={props.userId ? updatedValues : initialValues}
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
            updateUserMutation.mutate(model)
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

            <Button
              onClick={() => {
                props.userId && deleteUserMutation.mutate(props.userId)
                props.onDelete?.()
              }}
              isDisabled={!props.userId}
              text="Delete user"
              className="w-full mt-4"
              variation="danger"
            />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default UserForm
