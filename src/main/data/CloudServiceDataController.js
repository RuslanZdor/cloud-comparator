
import { v4 as uuidv4 } from 'uuid';

export class Field {
    constructor(id, label, description, defaultValue, type, possibleValues) {
        this.id = id;
        this.label = label;
        this.description = description;
        this.defaultValue = defaultValue;
        this.type = type;
        this.possibleValues = possibleValues;
    }
}

export class Service {
    constructor(id, name, description, fields, providers) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.fields = fields;
        this.providers = providers;
    }

    summary(providerId) {
        let result = 0;
        const provider = this.providers[providerId];
        let populateFormula = provider.formula;
        for (const priceName in provider.prices) {
            populateFormula = populateFormula.replaceAll(priceName, provider.prices[priceName]);
        }
        this.fields.forEach(field => {
            populateFormula = populateFormula.replaceAll(field.id, field.value);
        });
        console.log(populateFormula);
        console.log(eval(populateFormula));
        return Math.round(eval(populateFormula) * 100) / 100;
    }
}

export default class ServiceDataController {
    constructor(serviceList) {
        this.services = serviceList;
        this.services.map(service => service.isFinished = false)
        this.currentServices = new Map();
    }

    getServices() {
        return this.services;
    }

    getCurrentServices() {
        return this.currentServices;
    }

    addServiceToCurrentList(serviceId) {
        if (serviceId == null) {
            throw new Error("Service Id cannot be null");
        }
        let service = this.services.find(service => service.id === serviceId);
        const newServiceId = uuidv4();
        let newInstance = new Service(
            newServiceId,
            service.name,
            service.description,
            service.fields,
            service.providers
        );
        newInstance.isFinished = false;
        this.currentServices.set(newServiceId, newInstance);
        return newServiceId;
    }

    removeCurrentService(serviceId) {
        if (serviceId == null) {
            throw new Error("Service Id cannot be null");
        }
        this.currentServices.delete(serviceId);
    }

    saveNewService(serviceId, data) {
        const service = this.currentServices.get(serviceId);
        service.isFinished = true;
        if (data["service_name"]) {
            service.name = data["service_name"];
        }
        for (const field of service.fields) {
            if (data[field.id]) {
                field.value = data[field.id];
            } else {
                field.value = field.defaultValue;
            }
        }
    }

    editService(serviceId) {
        if (serviceId == null) {
            throw new Error("Service Id cannot be null");
        }
        this.currentServices.get(serviceId).isFinished = false;
    }

    removeAllCurrentService() {
        this.currentServices = new Map();
    }
}

