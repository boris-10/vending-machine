import Navbar from './Navbar'

const Layout = (props: any): JSX.Element => {
  return (
    <div>
      <Navbar />
      <main>{props.children}</main>
    </div>
  )
}

export default Layout
