import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";

const header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isCreateGenePage = location.pathname === "/create-gene";

  const handleButtonClick = () => {
    if (isCreateGenePage) {
      navigate(-1);
    } else {
      navigate("/create-gene");
    }
  };

  return (
    <div className="navbar bg-base-200 text-neutral-content top-0 h-[100px] overflow-hidden">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl text-blue-500">
          Via Scientific
        </Link>
      </div>

      <div className="navbar-end">
        <button onClick={handleButtonClick} className="text-blue-500 mr-10">
          {isCreateGenePage ? (
            <IoMdArrowRoundBack className="w-7 h-7" />
          ) : (
            <IoMdAdd className="w-7 h-7" />
          )}
        </button>
      </div>
    </div>
  );
};

export default header;
