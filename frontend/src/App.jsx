import "./assets/css/tailwind.css";
import api from "./api";

function App() {
  useEffect(() => {
    api.get(`/users`).then((data) => {
      console.log(data.data);
    });
  });
  return (
    <>
      <h1>app</h1>
    </>
  );
}

export default App;
