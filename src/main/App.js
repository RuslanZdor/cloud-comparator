import Comparator from "./Comparator";
import SelectService from "./SelectService";
import serviceList from "./data/all_services.json";
import CloudServiceDataController from "./data/CloudServiceDataController"
import { useState, useEffect } from "react";

function App() {

  let dataController = new CloudServiceDataController(serviceList);

  let [currentServices, setCurrentService] = new useState([]);

  let addCurrentServiceHandler = (serviceId) => {
    dataController.addServiceToCurrentList(serviceId);
    setCurrentService(new Map(dataController.currentServices()));
    console.log(currentServices);
  }

  let saveCurrentServiceHandler = (serviceId, data) => {
    dataController.saveNewService(serviceId, data);
    setCurrentService(new Map(dataController.currentServices()));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cloud Price Comparator</h1>
      </header>
      <div>
        <SelectService services={dataController.services()}
          addCurrentService={addCurrentServiceHandler} />
      </div>
      <div>
        <Comparator currentServices={currentServices}
          saveNewService={saveCurrentServiceHandler} />
      </div>
    </div>
  );
}

export default App;
