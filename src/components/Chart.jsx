import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import Sensors from "./Sensors";
import axios from "axios";
import api from "../api";

const chartStyle = {
  width: "700px",
  height: "auto",
  margin: "auto",
  color:"#1a0e30"
};

function Chart({ sensor, user, setSensor }) {
  const [records, setrecords] = useState([]);
  const [data, setdata] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        fill: false,
        radius: "3",
        borderWidth: "3",
        backgroundColor: "#26660b",
        borderColor: "#45b6fe",
      },
      {
        label: "Threshold Value",
        data: [],
        fill: false,
        backgroundColor: "red",
        borderWidth: "1",
        radius: "",
        borderColor: "red",
      },
    ],
  });

  const [options, setoptions] = useState({
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  });

  useEffect(() => {
    axios.get(`${api}/record/get`,{
      sensorId:sensor
    }).then((res) => {
      console.log("Sen Records", res.data);

      setrecords(res.data);

      let labelsR = [];
      let dataR = [];
      let treasHHole = [];
      res.data.forEach((d) => {
        dataR.push(d.temperature);
        labelsR.push(
          `${new Date(d.timestamp).toLocaleDateString()} - ${new Date(
            d.timestamp
          ).toLocaleTimeString()}`
        );
        treasHHole.push(d.sensor.threshold_value);
      });

      let datasetsR = data.datasets;
      datasetsR[0].data = dataR;
      datasetsR[1].data = treasHHole;

      setdata({ ...data, labels: labelsR, datasets: datasetsR });
    });
  }, [sensor]);

  return (
    <>
      <Sensors user={user} setSensor={setSensor} sensor={sensor} />
      {records.length != 0 && (
        <div style={chartStyle}>
          <Line data={data} options={options} />{" "}
        </div>
      )}
    </>
  );
}

export default Chart;
