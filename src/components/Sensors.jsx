import React, { useState, useEffect } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";

import api from "../api";

function Sensors({ user, setSensor, sensor }) {
  const [sensors, setsensors] = useState([]);
  const [selectedSensor, setselectedSensor] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    axios.get(`${api}/api/sensor/get${user}`).then((res) => {
      setsensors(res.data);
    });
  }, [user, dropdownOpen]);

  const selectSensor = (s) => {
    setselectedSensor(s);
    setSensor(s._id);
  };
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-3">
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret color="secondary">
              Sensor
            </DropdownToggle>
            <DropdownMenu>
              {sensors &&
                sensors.map((s) => (
                  <DropdownItem key={s._id} onClick={() => selectSensor(s)}>
                    {s.sensor_id}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <div className="col-8">
          <h4>
            Sensor : {selectedSensor.sensor_id} -{" "}
            <span className="text-danger">
              {selectedSensor.threshold_value}C
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Sensors;
