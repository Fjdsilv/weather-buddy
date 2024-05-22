import { useEffect, useState } from "react";
import Header from "./components/Header";
import { toast } from 'react-toastify';
import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = import.meta.env.VITE_API_KEY;


const App = () => {
  const [city, setCity] = useState("Recife");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();

    if (city === "") {
      toast.error("Enter a value valid!")
      return
    }
    setCity("");
    fetchData()
  }

  const url = `${baseURL}${city}&units=metric&APPID=${API_KEY}`;

  const fetchData = async () => {
      setIsLoading(true)
      try {
        const { data } = await axios.get(url);
        setData(data);
        // console.log(data);
      } catch (error) {
        setData({});
          console.log(error)
      }
      setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
    setCity("");
  },[])

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <section>
            <div className="wrapper">
              <form onSubmit={handleInput}>
                <div className="form-group">
                  <input 
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search a City..."
                    />
                  <button
                    disabled={isLoading}
                  >
                  Search
                  </button>
                </div>
              </form>
            </div>
          </section>
          <section>
            <div className="wrapper">
            <article className="info-group">
              <p style={{textAlign: "center", paddingTop: "5rem", fontSize: "2rem"}}>Loading...</p>
            </article>
            </div>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="wrapper">
            <form onSubmit={handleInput}>
              <div className="form-group">
                <input 
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search a City..."
                  />
                <button
                >
                Search
                </button>
              </div>
            </form>
          </div>
        </section>
        <section>
          <div className="wrapper">
          <article className="info-group">
            <h1>{data?.name ? data.name : "Null"}</h1>
            <h2>🌡️{data?.main?.temp ? data.main.temp.toFixed() : "Null"}ºC</h2>
            <div className="box-info">
              <div>
                <p>Feels Like</p>
                <p>🌡️{data?.main?.feels_like ? data.main.feels_like.toFixed() : "Null"}ºC</p>
              </div>
              <div>
                <p>Humidity</p>
                <p>🌫️{data?.main?.humidity ? data.main.humidity.toFixed() : "Null"}%</p>
              </div>
              <div>
                <p>Wind Speed</p>
                <p>🎐{data?.wind?.speed ? data.wind.speed.toFixed(1) : "Null"}MPH</p>
              </div>
            </div>
          </article>
          </div>
        </section>
      </main>
    </>
  )
}
export default App