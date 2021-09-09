import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

import Product from '../../models/Product'
import Button from '../atoms/Button'

interface ProductFormProps {
  productId?: number
  onSubmit: () => void
}

function ProductForm(props: ProductFormProps): JSX.Element {
  const upsertProductMutation = useMutation((productModel: Product) => {
    const { id, ...payload } = productModel

    if (productModel.id) {
      return axios.patch(`/products/${productModel.id}`, payload)
    } else {
      return axios.post('/products', payload)
    }
  })

  const { isLoading, isError, data, error, remove } = useQuery(
    'fetchProductById',
    () => axios(`/products/${props.productId}`),
    { enabled: !!props.productId }
  )

  if (!props.productId) {
    remove()
  }

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error</span>
  }

  const id = data?.data.id ?? null
  const sellerId = data?.data.sellerId ?? 1
  const productName = data?.data.productName ?? ''
  const cost = data?.data.cost ?? 0
  const amountAvailable = data?.data.amountAvailable ?? 0

  return (
    <div>
      <h1 className="mb-8 text-center">{props.productId ? `Edit product - ${productName}` : 'Create product'}</h1>

      <div className="flex justify-center">
        <Formik
          enableReinitialize
          initialValues={{ id, sellerId, productName, cost, amountAvailable }}
          validate={(model: Product) => {
            const errors: { name?: string } = {}
            if (!model.productName) {
              errors.name = 'Required'
            }
            return errors
          }}
          onSubmit={(model: Product) => {
            upsertProductMutation.mutate(model)
            props.onSubmit()
          }}
        >
          <Form className="w-96">
            <div className="flex justify-between mb-4">
              <label className="w-24 pt-1" htmlFor="productName">
                Name <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-col flex-1 ml-6">
                <Field
                  id="productName"
                  name="productName"
                  className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage name="productName" component="span" />
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <label className="w-24 pt-1" htmlFor="cost">
                Cost (¢)
              </label>
              <div className="flex flex-col flex-1 ml-6">
                <Field
                  id="cost"
                  name="cost"
                  type="number"
                  min="0"
                  className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage name="cost" component="span" />
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <label className="w-24 pt-1" htmlFor="amountAvailable">
                Amount
              </label>
              <div className="flex flex-col flex-1 ml-6">
                <Field
                  id="amountAvailable"
                  name="amountAvailable"
                  type="number"
                  min="0"
                  className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <Button type="submit" text="Submit" className="w-full mt-4" variation="success" />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default ProductForm
