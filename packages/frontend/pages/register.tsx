import React from 'react'
import { useMutation } from 'react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/router'
import axios from 'axios'

interface RegisterModel {
  username: string
  password: string
  role: string
}
export default function RegisterPage() {
  const router = useRouter()

  const registerMutation = useMutation(async (registerModel: RegisterModel) => {
    try {
      await axios.post('/sign-up', registerModel)
      router.push('/login')
    } catch (error) {
      throw error
    }
  })

  const onLoginRedirect = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create new account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or&nbsp;
            <a onClick={onLoginRedirect} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
              login
            </a>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <Formik
              enableReinitialize
              initialValues={{ username: '', password: '', role: 'Buyer' }}
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
                registerMutation.mutate(model)
              }}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="username">Username</label>
                  <Field
                    id="username"
                    name="username"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="username" render={(msg) => <div className="text-red-600 text-sm">{msg}</div>} />
                </div>

                <div className="mb-4">
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="password" render={(msg) => <div className="text-red-600 text-sm">{msg}</div>} />
                </div>

                <div className="mb-4">
                  <label htmlFor="role">Role</label>
                  <Field
                    id="role"
                    as="select"
                    name="role"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  >
                    <option value="Seller">Seller</option>
                    <option value="Buyer">Buyer</option>
                  </Field>
                </div>

                <div className="py-4">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
