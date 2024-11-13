import wind from "../images/wind.png";
import humidity2 from "../images/humidity2.png";
import { useEffect, useRef, useState } from "react";

function WeatherApp() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  // const search = async (city) => {
  //   if (city === "") {
  //     alert("Enter city name");
  //     return;
  //   }
  const search = async (city = "", lat = null, lon = null) => {
    let url = "";
    if (city !== "") {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
    } else {
      alert("Enter a city name or allow geolocation access.");
      return;
    }

    // try {
    //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
    //     import.meta.env.VITE_APP_ID
    //   }`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // const response = await fetch(url);
      // const data = await response.json();

      if (!response.ok) {
        alert("Check if the city you entered is correct");
        return;
      }
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          search("", lat, lon); // Search by coordinates
        },
        () => {
          search("kollam"); // Fallback to default location if user denies geolocation
        }
      );
    } else {
      search("kollam"); // Fallback to default location if geolocation is not supported
    }
  };

  useEffect(() => {
    getLocation(); // Get the user's location when the component mounts
  }, []);

  // useEffect(() => {
  //   search("kollam");
  // }, []);
  return (
    <>
      <div className="sm:px-10 sm:py-20 px-2 sm:bg-white sm:opacity-60 rounded-[45px] ">
        <div className="flex items-center justify-center  opacity-100">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search"
            className=" bg-white border border-black pl-2 w-[60%] h-9 rounded-xl transition-transform transform hover:scale-105"
          />
          <button>
            <i
              className="fa-solid fa-magnifying-glass-location ml-6 fa-2xl hover:opacity-65 transition-transform transform hover:scale-110 "
              onClick={() => search(inputRef.current.value)}
            ></i>
          </button>
        </div>
        {weatherData ? (
          <>
            <div className="flex flex-col items-center gap-y-3">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt="Weather icon"
                className="opacity-100 w-52 py-8"
              />
              <p className="font-bold text-6xl ">{weatherData.temperature}°c</p>
              <p className="font-bold text-4xl ">{weatherData.location}</p>
            </div>
            <div className="flex justify-center gap-x-28 mt-9">
              <div className="flex items-center gap-3">
                <img src={humidity2} alt="" className="w-12" />
                <div className="flex flex-col gap-y-3">
                  <p className="font-bold text-xl">{weatherData.humidity}%</p>
                  <p className="font-bold text-xl">Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src={wind} alt="" className="w-11" />
                <div className="flex flex-col gap-y-3">
                  <p className="font-bold text-xl">
                    {weatherData.windSpeed} Km/h
                  </p>
                  <p className="font-bold text-xl">Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default WeatherApp;

// import wind from "../images/wind.png";
// import humidity2 from "../images/humidity2.png";
// import { useEffect, useState } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

// function WeatherApp() {
//   const [weatherData, setWeatherData] = useState(false);
//   const [address, setAddress] = useState("");

//   const search = async (city) => {
//     if (city === "") {
//       alert("Enter city name");
//       return;
//     }
//     try {
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
//         import.meta.env.VITE_APP_ID
//       }`;

//       const response = await fetch(url);
//       const data = await response.json();

//       if (!response.ok) {
//         alert("Check if the city you entered is correct");
//         return;
//       }
//       console.log(data);
//       setWeatherData({
//         humidity: data.main.humidity,
//         windSpeed: data.wind.speed,
//         temperature: Math.floor(data.main.temp),
//         location: data.name,
//         icon: data.weather[0].icon,
//       });
//     } catch (error) {
//       setWeatherData(false);
//       console.error("Error in fetching weather data");
//     }
//   };

//   useEffect(() => {
//     search("kollam");
//   }, []);

//   const handleSelect = async (value) => {
//     const results = await geocodeByAddress(value);
//     const latLng = await getLatLng(results[0]);
//     setAddress(value);
//     search(value); // Search by the selected place name
//   };

//   return (
//     <>
//       <div className="sm:px-10 sm:py-20 px-2 sm:bg-white sm:opacity-60 rounded-[45px]">
//         <div className="flex items-center justify-center opacity-100">
//           <PlacesAutocomplete
//             value={address}
//             onChange={setAddress}
//             onSelect={handleSelect}
//           >
//             {({
//               getInputProps,
//               suggestions,
//               getSuggestionItemProps,
//               loading,
//             }) => (
//               <div className="relative">
//                 <input
//                   {...getInputProps({
//                     placeholder: "Search city",
//                     className:
//                       "bg-white border border-black pl-2 w-[60%] h-9 rounded-xl transition-transform transform hover:scale-105",
//                   })}
//                 />
//                 <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg w-[60%]">
//                   {loading && <div>Loading...</div>}
//                   {suggestions.map((suggestion) => {
//                     const className = suggestion.active
//                       ? "suggestion-item--active p-2 bg-gray-200"
//                       : "suggestion-item p-2";
//                     return (
//                       <div
//                         {...getSuggestionItemProps(suggestion, {
//                           className,
//                         })}
//                         key={suggestion.placeId}
//                       >
//                         <span>{suggestion.description}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </PlacesAutocomplete>
//           <button>
//             <i
//               className="fa-solid fa-magnifying-glass-location ml-6 fa-2xl hover:opacity-65 transition-transform transform hover:scale-110"
//               onClick={() => search(address)}
//             ></i>
//           </button>
//         </div>
//         {weatherData ? (
//           <>
//             <div className="flex flex-col items-center gap-y-3">
//               <img
//                 src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
//                 alt="Weather icon"
//                 className="opacity-100 w-52 py-8"
//               />
//               <p className="font-bold text-6xl ">{weatherData.temperature}°c</p>
//               <p className="font-bold text-4xl ">{weatherData.location}</p>
//             </div>
//             <div className="flex justify-center gap-x-28 mt-9">
//               <div className="flex items-center gap-3">
//                 <img src={humidity2} alt="" className="w-12" />
//                 <div className="flex flex-col gap-y-3">
//                   <p className="font-bold text-xl">{weatherData.humidity}%</p>
//                   <p className="font-bold text-xl">Humidity</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <img src={wind} alt="" className="w-11" />
//                 <div className="flex flex-col gap-y-3">
//                   <p className="font-bold text-xl">
//                     {weatherData.windSpeed} Km/h
//                   </p>
//                   <p className="font-bold text-xl">Wind Speed</p>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : null}
//       </div>
//     </>
//   );
// }

// export default WeatherApp;
