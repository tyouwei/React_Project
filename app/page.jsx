import MainPage from "@components/MainPage"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Essays Made Easy
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          An AI-Powered Essay Generator
        </span>
      </h1>
      <p className="desc text-center">
          ChatEasy is an attempt to generate essays by learning from user's writing habits and replicating them in a desired output
      </p>
      
      <MainPage/>
    </section>
  )
}
export default Home