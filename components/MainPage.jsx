import Link from "next/link"

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="left-component"> 
        <Link 
          href="/generator"
          className="blue_btn">
            Generate
        </Link>
      </div>
      <div className="right-component">
        <Link 
          href="/insert-file"
          className="green_btn">
            Train
        </Link>
      </div>
    </div>
  )
}

export default MainPage