import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState,useEffect } from "react";
import "./style.css";
import Cards from "./Cards";
import React from "react";

const Wheather = () => {
  const apiKey = "6cf0332343b098d4f43241220b91f9e2";
  const [city, setCity] = useState("");
  const [res, setRes] = useState([]);
  const [check,setCheck]=useState()
  const [btn,setbtn]=useState(false)
  useEffect(() => {
    // Fetch weather data for the default city when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${"vijayawada"}&appid=${apiKey}&units=metric`
        );
        const response = await data.json();
        if (response.cod === 200) {
          setRes([response]);
          setCheck(true);
        } else {
          setRes([]);
          setCheck(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRes([]);
        setCheck(false);
      }
    };

    fetchData();
  }, []);
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  async function getData(event) {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setCheck(data.ok);
      const response = await data.json();
      console.log(await response);
  
      // Instead of appending, replace the current state with the new response
      setRes([response]);
  
      setbtn(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRes([]); // Reset state on error
      setCheck(false);
    }
  }
  
  async function HandleInput(event) {
    const city = event.target.value;
    setCity(city);
    setbtn(false)

  }


  return (
    <div className="mainContainer">
      <div className="search">
        <TextField 
        onKeyDown={(e)=>{
            e.key=="Enter" ? getData():""
        }}
        size="small"
          id="outlined-basic"
          onChange={HandleInput}
          value={city}
          placeholder="Enter city here"
          variant="outlined"
          
        />
        <Button variant="contained" onClick={getData} >
          Search
        </Button>
      </div>
      <div>

          <h3 style={{ textAlign: "center" }}>{res.map(response=>response.name)} Wheather report</h3>
        

 <div className="conditions">
          {check ? (
            res.map((response) => (
              <>
                <Cards className="card" header="temperature" value={response.main.temp + "°C"} />
                <Cards className="card" header="feelsLike" value={response.main.feels_like + "°C"} />
                <Cards className="card" header="Humidity" value={response.main.humidity + "%"} />
                <Cards className="card" header="Weather" value={response.weather[0].main} />
                <Cards className="card" header="description" value={response.weather[0].description} />
                <Cards className="card" header="Visibility" value={response.visibility + "m"} />
                <Cards className="card" header="WindSpeed" value={response.wind.speed + "m/s"} />
                <Cards className="card" header="WindDirection" value={response.wind.deg + "°"} />
                <Cards className="card" header="Cloudiness" value={response.clouds.all + "%"} />
                <Cards className="card" header="Pressure" value={response.main.pressure} />
                <Cards className="card" header="Sunrise" value={response.sys.sunrise ? new Date(response.sys.sunrise * 1000).toLocaleTimeString() : "N/A"} />
                <Cards className="card" header="Sunset" value={response.sys.sunset ? new Date(response.sys.sunset * 1000).toLocaleTimeString() : "N/A"} />
              </>
            ))
          ) : (
            <h4 style={{ textAlign: "center" }}>City not found</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wheather;
