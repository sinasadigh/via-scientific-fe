import React, { useState } from "react";
import apiService from "../services/api.service";
import Toast from "../ui/toast";

interface Gene {
  geneID: string;
  transcript: string;
  experRep: number[];
  controlRep: number[];
}

type ToastProps = {
  message: string;
  type?: string;
};

const GeneForm = () => {
  const [genes, setGenes] = useState<Gene[]>([
    {
      geneID: "",
      transcript: "",
      experRep: [0, 0, 0],
      controlRep: [0, 0, 0],
    },
  ]);
  const [toastMessages, setToastMessages] = useState<ToastProps[]>([]);

  const addGene = () => {
    setGenes([
      ...genes,
      {
        geneID: "",
        transcript: "",
        experRep: [0, 0, 0],
        controlRep: [0, 0, 0],
      },
    ]);
  };
  const handleApiError = (error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (err: any) => err.message
        );
        setToastMessages(errorMessages);
      } else {
        // Handle other types of errors if needed
        const errorMessage = `Response Error: ${error.response.data}, Status: ${error.response.status}`;
        setToastMessages([{ message: errorMessage, type: "error" }]);
      }
    } else if (error.request) {
      // The request was made but no response was received
      const errorMessage = `Request Error: ${error.request}`;
      setToastMessages([{ message: errorMessage, type: "error" }]);
    } else {
      // Something happened in setting up the request that triggered an Error
      const errorMessage = `Error: ${error.message}`;
      setToastMessages([{ message: errorMessage, type: "error" }]);
    }
  };
  const handleGeneChange = (
    index: number,
    field: keyof Gene,
    value: string
  ) => {
    const updatedGenes = [...genes];
    if (field === "geneID" || field === "transcript") {
      updatedGenes[index][field] = value as string;
      setGenes(updatedGenes);
    }
  };

  const handleArrayChange = (
    index: number,
    field: keyof Gene,
    subIndex: number,
    value: number
  ) => {
    const updatedGenes = [...genes];
    if (field === "experRep" || field === "controlRep") {
      if (typeof subIndex === "number") {
        updatedGenes[index][field][subIndex] = value as number;
        setGenes(updatedGenes);
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Filter out genes without geneID
    console.log(genes);
    const validGenes = genes.filter((gene) => gene.geneID.trim() !== "");
    if (validGenes.length === 0) {
      setToastMessages([
        { message: "Please enter at least one gene", type: "error" },
      ]);
      return;
    }

    // Handle form submission
    try {
      await apiService.postData(validGenes).then((response: any) => {
        setToastMessages([
          { message: response?.message?.text, type: "success" },
        ]);
        setTimeout(() => {
          setToastMessages([]);
          location.replace("/");
        }, 3000);
      });
    } catch (error) {
      console.error("Failed to send data to API:", error);
      handleApiError(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {toastMessages.length > 0 && (
        <div className="toast-container">
          {toastMessages.map((toast, index) => (
            <Toast key={index} message={toast.message} type={toast.type} />
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {genes.map((gene, index) => (
          <div
            key={index.toString()}
            className="bg-base-100 p-4 rounded-md flex flex-col  justify-center gap-3 mt-5">
            <div className="flex flex-wrap gap-3 justify-center">
              <label className="label min-w-[100px]">
                <span className="label-text mr-3">Gene ID</span>{" "}
                <input
                  type="text"
                  placeholder="John"
                  className="input input-bordered max-w-[10rem] sm:max-w-[20rem]"
                  value={gene.geneID}
                  onChange={(e) =>
                    handleGeneChange(index, "geneID", e.target.value)
                  }
                />
              </label>

              <label className="label min-w-[100px] ">
                <span className="label-text mr-3">Transcript</span>
                <input
                  type="text"
                  placeholder="Smith"
                  className="input input-bordered max-w-[10rem] sm:max-w-[20rem]"
                  value={gene.transcript}
                  onChange={(e) =>
                    handleGeneChange(index, "transcript", e.target.value)
                  }
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-3  p-5 bg-base-200">
              <label className="label min-w-[100px]">
                <span className="label-text mr-3">Expression 1</span>{" "}
                <input
                  type="number"
                  placeholder="0.0"
                  className="input input-bordered max-w-[10rem] sm:max-w-[20rem] "
                  onChange={(e) =>
                    handleArrayChange(index, "experRep", 0, +e.target.value)
                  }
                />
              </label>

              <label className="label min-w-[100px] ">
                <span className="label-text mr-3">Expression 2</span>
                <input
                  type="number"
                  placeholder="0.0"
                  className="input input-bordered max-w-[10rem] sm:max-w-[20rem]"
                  onChange={(e) =>
                    handleArrayChange(index, "experRep", 1, +e.target.value)
                  }
                />
              </label>

              <label className="label min-w-[100px] ">
                <span className="label-text mr-3">Expression 3</span>
                <input
                  type="number"
                  placeholder="0.0"
                  className="input input-bordered max-w-[10rem] sm:max-w-[20rem]"
                  onChange={(e) =>
                    handleArrayChange(index, "experRep", 2, +e.target.value)
                  }
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-3 p-5 bg-base-200">
              <label className="label min-w-[100px] ">
                <span className="label-text mr-3">Control 1</span>
                <input
                  type="number"
                  placeholder="0.0"
                  className="input input-bordered max-w-[10rem] sm:max-w-[20rem]"
                  onChange={(e) =>
                    handleArrayChange(index, "controlRep", 0, +e.target.value)
                  }
                />
              </label>

              <label className="label min-w-[100px] ">
                <span className="label-text mr-3">Control 2</span>
                <input
                  type="number"
                  placeholder="0.0"
                  className="input input-bordered max-w-[10rem] sm:max-w-[20rem]"
                  onChange={(e) =>
                    handleArrayChange(index, "controlRep", 1, +e.target.value)
                  }
                />
              </label>

              <label className="label min-w-[100px] ">
                <span className="label-text mr-3">Control 3</span>
                <input
                  type="number"
                  placeholder="0.0"
                  className="input input-bordered max-w-[10rem] sm:max-w-[20rem]"
                  onChange={(e) =>
                    handleArrayChange(index, "controlRep", 2, +e.target.value)
                  }
                />
              </label>
            </div>
            {index + 1 - genes.length === 0 && (
              <div className="flex gap-5 w-full justify-lefy">
                <button
                  type="button"
                  className="btn  bg-success min-w-[25%]"
                  onClick={addGene}>
                  Add
                </button>
                <button type="submit" className="btn bg-warning min-w-[25%]">
                  Submit
                </button>
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default GeneForm;
