import Comparator from "./Comparator";
import SelectService from "./SelectService";
import Summary from "./Summary";
import serviceList from "./data/all_services.json";
import CloudServiceDataController from "./data/CloudServiceDataController"
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

let dataController = new CloudServiceDataController(serviceList);

function App() {

  let [currentServices, setCurrentService] = new useState([]);

  let addCurrentServiceHandler = (serviceId) => {
    dataController.addServiceToCurrentList(serviceId);
    setCurrentService(new Map(dataController.getCurrentServices()));
  }

  let saveCurrentServiceHandler = (serviceId, data) => {
    dataController.saveNewService(serviceId, data);
    setCurrentService(new Map(dataController.getCurrentServices()));
  }

  let removeServiceHandler = (serviceId) => {
    dataController.removeCurrentService(serviceId);
    setCurrentService(new Map(dataController.getCurrentServices()));
  }

  let editServiceHandler = (serviceId) => {
    dataController.editService(serviceId);
    setCurrentService(new Map(dataController.getCurrentServices()));
  }

  let removeAllServicesHandler = (serviceId) => {
    dataController.removeAllCurrentService();
    setCurrentService(new Map(dataController.getCurrentServices()));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cloud Price Comparator</h1>
      </header>
      <div>
        <SelectService services={dataController.getServices()}
          addCurrentService={addCurrentServiceHandler} />
      </div>
      <div>
        <Comparator currentServices={currentServices}
          saveNewService={saveCurrentServiceHandler}
          removeService={removeServiceHandler}
          editService={editServiceHandler}
          removeAllServices={removeAllServicesHandler} />
      </div>
      <div>
        <Summary services={currentServices} />
      </div>
    </div>
  );
}

export default App;
