import { useUserContext } from "#context/UserContext.jsx"


const Home = () => {

    const context = useUserContext()
  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl font-bold mt-2">Hi from Home Page</h1>
      </div>
    </>
  )
}

export default Home
