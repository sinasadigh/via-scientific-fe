import Header from "./ui/header";
import Footer from "./ui/footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-300 ">
      <Header />
      <div className="flex-1  justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
