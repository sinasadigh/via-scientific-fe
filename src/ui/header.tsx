import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import {  useLocation, useNavigate } from "react-router-dom";

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
        <a className="btn btn-ghost text-xl">Via Scientific</a>
      </div>

      <div className="navbar-end">
        {/* {!isCreateGenePage ? (
          <Link to="/create-gene" className="btn btn-square">
            <IoMdAdd className="w-7 h-7" />
          </Link>
        ) : (
            <button onClick={() => navigate(-1)}>Back</button> 
        )} */}
        <button onClick={handleButtonClick} className="text-white">
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
