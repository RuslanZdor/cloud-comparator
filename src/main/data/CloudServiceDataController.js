
import { v4 as uuidv4 } from 'uuid';

export class Field {
    constructor(id, label, description, defaultValue) {
        this.id = id;
        this.label = label;
        this.description = description;
        this.defaultValue = defaultValue;
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
        this.fields.forEach(field => {
            result += field.value * provider.prices[field.id];
        });
        return result;
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

