import WeatherApp from "./components/WeatherApp";

function App() {
  return (
    <>
      <div
        className="bg-[url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
       bg-cover bg-center backdrop-blur-sm  h-screen  flex justify-center items-center"
      >
        <WeatherApp />
      </div>
    </>
  );
}

export default App;
