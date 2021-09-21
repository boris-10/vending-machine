import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import Button from '../atoms/Button'

import Product from '../../models/Product'
import { useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'

interface ProductFormProps {
  productId?: number
  onSubmit: () => void
  onDelete?: () => void
}

const ProductForm = (props: ProductFormProps): JSX.Element => {
  const { currentUser } = useContext(AuthContext)

  const { data, remove } = useQuery('fetchProductById', () => axios(`/products/${props.productId}`), {
    enabled: !!props.productId,
  })

  if (!props.productId) {
    remove()
  }

  const upsertProductMutation = useMutation((productModel: Product) => {
    const { id, ...payload } = productModel

    if (id) {
      return axios.patch(`/products/${id}`, payload)
    } else {
      return axios.post('/products', payload)
    }
  })

  const deleteProductMutation = useMutation((id: number) => axios.delete(`/products/${id}`))

  const initialValues = {
    id: null,
    sellerId: 0,
    productName: '',
    cost: 0,
    amountAvailable: 0,
  }

  const updatedValues = {
    id: data?.data.id ?? null,
    sellerId: currentUser?.id ?? 0,
    productName: data?.data.productName ?? '',
    cost: data?.data.cost ?? 0,
    amountAvailable: data?.data.amountAvailable ?? 0,
  }

  return (
    <div>
      <h1 className="mb-8 text-center">
        {props.productId ? `Edit product - ${data?.data.productName}` : 'Create product'}
      </h1>

      <div className="flex justify-center">
        <Formik
          enableReinitialize
          initialValues={props.productId ? updatedValues : initialValues}
          validate={(model: Product) => {
            const errors: { name?: string } = {}
            if (!model.productName) {
              errors.name = 'Required'
            }
            return errors
          }}
          onSubmit={async (model: Product) => {
            await upsertProductMutation.mutateAsync(model)
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

            <Button
              onClick={() => {
                props.productId && deleteProductMutation.mutate(props.productId)
                props.onDelete?.()
              }}
              isDisabled={!props.productId}
              text="Delete product"
              className="w-full mt-4"
              variation="danger"
            />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default ProductForm
