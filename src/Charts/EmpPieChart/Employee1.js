import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import React from "react";

export function Employee1() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Work", "Leave"],
        datasets: [
          {
            data: [3, 2],
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: "200px", height: "150px" }} />
    </div>
  );
}
