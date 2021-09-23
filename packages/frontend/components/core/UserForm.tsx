import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'

import Button from '../shared/Button'

import User, { UserRole } from '../../models/User'

interface UserFormProps {
  onSubmit: (user: Partial<User>) => void
  onDelete?: () => void
}

const UserForm = (props: UserFormProps): JSX.Element => {
  const { data } = useQuery('fetchUser', () => axios(`/users/me`), {
    enabled: true,
  })

  const updateUserMutation = useMutation((user: Partial<User>) => {
    const { id, ...payload } = user

    return axios.patch(`/users`, payload)
  })

  const deleteUserMutation = useMutation(() => axios.delete(`/users`))

  const onDelete = async () => {
    await deleteUserMutation.mutateAsync()
    props.onDelete?.()
  }

  return (
    <div>
      <div className="flex justify-center">
        <Formik
          enableReinitialize
          initialValues={{
            id: data?.data.id ?? null,
            username: data?.data.username ?? '',
            role: data?.data.role ?? UserRole.Buyer,
          }}
          validate={(model: Partial<User>) => {
            const errors: { username?: string; password?: string } = {}
            if (!model.username) {
              errors.username = 'Required'
            }
            return errors
          }}
          onSubmit={(model: Partial<User>) => {
            updateUserMutation.mutate(model)
            props.onSubmit(model)
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
                <ErrorMessage name="username" component="span" className="text-red-600 text-sm" />
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
                  <option value="Seller">Seller</option>
                  <option value="Buyer">Buyer</option>
                </Field>
              </div>
            </div>

            <Button type="submit" text="Submit" className="w-full mt-4" variation="success" />

            <Button onClick={onDelete} text="Delete user" className="w-full mt-4" variation="danger" />
            <div className="flex justify-center mt-8">
              <Link href="change-password">
                <p className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">Change password</p>
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default UserForm
