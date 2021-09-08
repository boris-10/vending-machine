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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or&nbsp;
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              create new user
            </a>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <Field
                  id="username"
                  name="username"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />

                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />

                <ErrorMessage name="username" render={(msg) => <div className="text-pink-600">{msg}</div>} />
                <ErrorMessage name="password" render={(msg) => <div className="text-pink-600">{msg}</div>} />

                <div className="py-4">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Sign in
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

export default LoginForm
