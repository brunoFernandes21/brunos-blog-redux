import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
        <h1 className="text-white font-bold text-4xl">404</h1>
        <h2 className="text-white font-bold text-4xl">Page Not Found</h2>
        <Link to="/" className="text-blue-800 bg-white p-2 rounded font-bold">Go back to home</Link>
    </div>
  )
}

export default NotFound