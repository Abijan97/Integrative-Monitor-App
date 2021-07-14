import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import api from "../api";
import Sensors from "./Sensors";

function AlertsTable({ user, sensor, setSensor }) {
  const [alerts, setalerts] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/api/alert/get`,{
        sensorId:sensor
      })
      .then((res) => {
        console.log("Alerts Records", res.data);
        setalerts(res.data);
      })
      .catch((e) => {
        toast.error(`Getting Alerts Failed`);
      });
  }, [user, sensor]);

  return (
    <div className="row bg-info">
      <div className="col-2"></div>
      <div className="col-8">
        <Sensors user={user} setSensor={setSensor} sensor={sensor} />

        <table className="table table-borderless table-hover mt-5">
          <thead className="text-center">
            <tr>
              <th>Sensor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Temperature</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {alerts &&
              alerts.map((d) => {
                return (
                  <tr style={{ textAlign: "center" }} key={d._id}>
                    <td>{d.sensor.sensor_id}</td>
                    <td className="text-center">
                      {new Date(d.timestamp).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {new Date(d.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="text-center">{d.temperature} C</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default AlertsTable;
