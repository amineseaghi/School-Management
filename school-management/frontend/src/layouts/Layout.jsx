import { Link, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
    <header className="bg-[#2D3748] text-white px-5 h-12 flex items-center justify-between shadow-sm">

      <div className="flex items-center space-x-2.5">

        <svg
          className="w-6 h-6 text-[#38BDF8]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.69 11.8 9.24 12.4 9.85C13.38 10.85 14.52 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.31 17.2 8.76 16.6 8.15C15.62 7.15 14.48 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.69 6.8 15.24 7.4 15.85C8.38 16.85 9.52 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.31 12.2 14.76 11.6 14.15C10.62 13.15 9.48 12 7 12Z" />
        </svg>

        <span className="text-lg font-semibold tracking-tight">
          School management
        </span>
      </div>

      <div>
      <ul className="flex text-white">

        <li className="ml-5 px-2 py-1">
            <Link to={"/"}>Home Page</Link>
        </li>
        <li className="ml-5 px-2 py-1">
            <Link to={'/login'}>Login</Link>
        </li>
        <li className="ml-5 px-2 py-1">
            <Link to={'/register'}>Register</Link>
        </li>
        <li className="ml-5 px-2 py-1">
            <Link to={'/users'}>Users</Link>
        </li>

        <button className="bg-white text-gray-800 font-bold px-2.5 py-0.5 rounded text-[10px] tracking-wider uppercase hover:bg-gray-100 transition-colors">
          Dark Mode
        </button>
      </ul>
      </div>
    </header>

        <main className={"container mx-auto"}>
            <Outlet />
        </main>
    </>
  )
}

export default Layout
