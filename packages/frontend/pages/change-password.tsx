import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { ReactElement } from 'react'

import Layout from '../components/core/Layout'

interface ChangePasswordModel {
  newPassword: string
  confirmPassword: string
}

export default function ChangePasswordPage() {
  const router = useRouter()

  const changePasswordMutation = useMutation(async (changePasswordModel: ChangePasswordModel) => {
    try {
      await axios.patch('/change-password', changePasswordModel)
      router.push('/me')
    } catch (error) {
      throw error
    }
  })

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <Formik
              enableReinitialize
              initialValues={{ newPassword: '', confirmPassword: '' }}
              validate={(model) => {
                const errors: { username?: string; password?: string } = {}
                if (!model.newPassword) {
                  errors.username = 'Required'
                }
                if (!model.confirmPassword) {
                  errors.password = 'Required'
                }
                return errors
              }}
              onSubmit={(model) => {
                changePasswordMutation.mutate(model)
              }}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="new-password">New password</label>
                  <Field
                    id="new-password"
                    name="newPassword"
                    type="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="username" render={(msg) => <div className="text-red-600 text-sm">{msg}</div>} />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirm-password">Confirm password</label>
                  <Field
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="password" render={(msg) => <div className="text-red-600 text-sm">{msg}</div>} />
                </div>

                <div className="py-4">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change password
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

ChangePasswordPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export function getStaticProps() {
  return {
    props: {
      auth: true,
    },
  }
}
