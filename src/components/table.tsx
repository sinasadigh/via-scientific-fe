import { useEffect, useState } from "react";
import apiService from "../services/api.service";

interface Gene {
  geneID: string;
  transcript: string;
  experRep: number[][];
  controlRep: number[][];
}

const table = () => {
  const [data, setData] = useState<Gene[]>([]);
  const [showModal, setShowModal] = useState("");

  const handleShowModal = (prop: string) => {
    document!.getElementById("my_modal_1")!.showModal();
    const respond = async () => {
      const dataRes: any = await apiService.analyze(prop);
      console.log(dataRes);
      setShowModal(dataRes.data.median);
    };

    respond();
  };

  useEffect(() => {
    const getData = async () => {
      const dataRes: any = await apiService.getData();
      setData(dataRes.data);
      console.log(dataRes);
    };
    getData();
  }, []);
  return (
    <div className="h-[calc(100vh-18rem)]  overflow-x-auto  m-10 no-scrollbar">
      <table className="table table-zebra text-black">
        <thead>
          <tr className="text-black">
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>company</th>
            <th>location</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((gene, index) => (
            <tr key={index.toString()}>
              <th>{index}</th>
              <td>{gene.geneID}</td>
              <td>{gene.transcript}</td>
              <td>{gene.experRep[0]}</td>
              <td>{gene.experRep[1]}</td>
              <td>{gene.geneID}</td>
              <td>{gene.geneID}</td>
              <td>{gene.geneID}</td>
              <td>{gene.geneID}</td>
              <td>
                <button
                  className="btn btn-info bg-base-100 h-8 w-15"
                  onClick={() => handleShowModal(gene.geneID)}>
                  Analyze
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="text-black">
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>company</th>
            <th>location</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
          </tr>
        </tfoot>
      </table>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{showModal}</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default table;
