import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

import Product from '../../models/Product'

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
      <h2>{props.productId ? `Edit product - ${productName}` : 'Create product'}</h2>

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
        <Form>
          <label htmlFor="productName">Name</label>
          <Field
            id="productName"
            name="productName"
            className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <ErrorMessage name="productName" component="span" />

          <br />
          <label htmlFor="cost">Cost</label>
          <Field
            id="cost"
            name="cost"
            type="number"
            className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <ErrorMessage name="cost" component="span" />

          <br />
          <label htmlFor="amountAvailable">Amount available</label>
          <Field
            id="amountAvailable"
            name="amountAvailable"
            type="number"
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

export default ProductForm
