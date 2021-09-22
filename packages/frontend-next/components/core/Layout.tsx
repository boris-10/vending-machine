import Navbar from './Navbar'

const Layout = ({ children }: any): JSX.Element => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default Layout
