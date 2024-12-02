'use client';

import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  let [matrix, setMatrix] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  let [startVert, setStartVert] = useState<number>(0);
  const [responseData, setResponseData] = useState<string[]>([""]);
  const [gridClass, setGridClass] = useState<string>("grid grid-cols-4 gap-10");

  const addVertex = () => {
    console.log("add vertex clicked");
    const newRow = Array(matrix[0].length).fill(0);
    setGridClass("grid grid-cols-" + (matrix[0].length+1).toString() + " gap-10");
    setMatrix((prevMatrix) => {
      let updatedMatrix = [...prevMatrix];
      updatedMatrix.push(newRow);
      console.log(updatedMatrix.length)
      for (let i = 0; i < updatedMatrix.length; i++) {
        updatedMatrix[i].push(0);
        console.log(updatedMatrix[i])
      }
      return updatedMatrix;
    });
  };

  const removeVertex = () => {
    console.log("remove vertex clicked");
    setGridClass("grid grid-cols-" + (matrix[0].length-1).toString() + " gap-10");
    setMatrix((prevMatrix) => {
      let updatedMatrix = [...prevMatrix].slice(0, matrix[0].length-1);
      console.log(updatedMatrix.length)
      for (let i = 0; i < updatedMatrix.length; i++) {
        updatedMatrix[i].pop();
        console.log(updatedMatrix[i])
      }
      return updatedMatrix;
    });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: number) => {
    setMatrix((prevMatrix) => {
      const updatedMatrix = [...prevMatrix];
      updatedMatrix[rowIndex][colIndex] = value;
      console.log(updatedMatrix);
      return updatedMatrix;
    });
  };

  const updateStartVert = (value: number) => {
    setStartVert(value);
  };

  const isDiagonal = (rowIndex: number, colIndex: number) => {
    if (rowIndex == colIndex) {
      return true;
    } else {
      return false;
    }
  }

  async function ComputeMatrix() {
    const matrixData = {
      start_vert: startVert,
      data: matrix,
    };
    const response = await fetch('/api/nearest-neighbor', {
      method: 'POST',
      body: JSON.stringify(matrixData),
    })
 
    // Handle response if necessary
    const ret_data = await response.json();
    const path = JSON.stringify(ret_data.data.path)
    setResponseData(() => { 
      let updated: string[] = [path.substring(1, path.length-1), JSON.stringify(ret_data.data.weight)];
      return updated;
    });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight dark:text-white">
        Nearest Neighbor
        </h1>

        <p>
        Input an <span className="font-bold">Adjacency Matrix</span>.
        </p>

        <div className="grid grid-cols-[60%_40%] items-center justify-items-center flex-col sm:flex-row">
          <div className="grid grid-cols-[80%_20%] gap-2">
            <div className="p-4">

              <div className="grid gap-5">
                {matrix.map((row, rowIndex) => (
                  <div key={rowIndex} className={gridClass}>
                    {row.map((cell, colIndex) => (
                      
                      <input
                        key={`${rowIndex}-${colIndex}`}
                        type="text"
                        disabled={isDiagonal(rowIndex, colIndex)}
                        onChange={(e) =>
                          updateCell(rowIndex, colIndex, Number(e.target.value))
                        }
                        placeholder="0"
                        className={"block w-14 h-14 py-2 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <button
                  onClick={addVertex}
                  className="py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                  Add Vertex
              </button>
              <button
                  onClick={removeVertex}
                  className="mt-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                  Remove Vertex
              </button>
            </div>
            
          </div>
          <div className="flex flex-col">
            <input 
              className="block p-2 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Starting Vertex..."
              onChange={(e) =>
                updateStartVert(Number(e.target.value))}
            >

            </input>
            <button
              onClick={ComputeMatrix}
              className="mt-4 row-start-2 px-10 mb-10 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
            >
              Compute
            </button>
            {responseData && (
            <div className="p-4 border rounded">
              <p>Path taken: {responseData[0]}</p>
              <p className="font-extrabold">Weight: {responseData[1]}</p>
            </div>
            )}
          </div>
        </div>
        
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/joswinjohn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to Source →
        </a>
      </footer>
    </div>
  );
}
