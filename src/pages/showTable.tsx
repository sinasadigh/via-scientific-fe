import { useEffect, useState } from "react";
import apiService from "../services/api.service";
import { TbAnalyze } from "react-icons/tb";

interface Gene {
  geneID: string;
  transcript: string;
  experRep: number[];
  controlRep: number[];
}

interface Analytics {
  geneID: string;
  mean: number;
  median: number;
  variance: number;
  anomalies: number[];
}

const table = () => {
  const [data, setData] = useState<Gene[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    geneID: "",
    mean: 0,
    median: 0,
    variance: 0,
    anomalies: [],
  });

  const handleShowModal = (prop: string) => {
    document!.getElementById("my_modal_1")!.classList.add("modal-open");
    const respond = async () => {
      const dataRes: any = await apiService.analyze(prop);
      setAnalytics({ geneID: prop, ...dataRes.data });
    };

    respond();
  };
  const handleCloseModal = () => {
    document!.getElementById("my_modal_1")!.classList.remove("modal-open");
  };
  useEffect(() => {
    const getData = async () => {
      const dataRes: any = await apiService.getData();
      setData(dataRes.data);
    };
    getData();
  }, []);
  return (
    <div className="h-[calc(100vh-18rem)]  overflow-x-auto  m-10 no-scrollbar">
      <table className="table table-zebra text-black">
        <thead>
          <tr className="text-black">
            <th></th>
            <th>Gene ID</th>
            <th>Transcript</th>
            <th>exper_rep1</th>
            <th>exper_rep2</th>
            <th>exper_rep3</th>
            <th>control_rep1</th>
            <th>control_rep2</th>
            <th>control_rep3</th>
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
              <td>{gene.experRep[2]}</td>
              <td>{gene.controlRep[0]}</td>
              <td>{gene.controlRep[1]}</td>
              <td>{gene.controlRep[2]}</td>
              <td>
              <button
                  className=" bg-emerald-400  rounded-full p-1 hover:bg-emerald-500 "
                  onClick={() => handleShowModal(gene.geneID)}>
                  <TbAnalyze className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="text-black">
            <th></th>
            <th>Gene ID</th>
            <th>Transcript</th>
            <th>exper_rep1</th>
            <th>exper_rep2</th>
            <th>exper_rep3</th>
            <th>control_rep1</th>
            <th>control_rep2</th>
            <th>control_rep3</th>
          </tr>
        </tfoot>
      </table>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg">{analytics.geneID}</h3>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Mean</div>
              <div className="stat-value">{analytics.mean.toFixed(3)}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Median</div>
              <div className="stat-value">{analytics.median.toFixed(3)}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Variance</div>
              <div className="stat-value">{analytics.variance.toFixed(3)}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Anomalies</div>
              <div className="stat-value">{analytics.anomalies.toString()}</div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default table;
