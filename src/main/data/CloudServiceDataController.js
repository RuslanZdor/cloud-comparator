
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

    summary(providerId, formula) {
        const provider = this.providers[providerId];
        if (!formula) {
            return this.summaryAll(providerId);
        }
        for (const priceName in provider.prices) {
            formula = formula.replaceAll(priceName, provider.prices[priceName]);
        }
        this.fields.forEach(field => {
            formula = formula.replaceAll(field.id, field.value);
        });
        return Math.round(eval(formula) * 100) / 100;
    }

    summaryAll(providerId) {
        let result = 0;
        const provider = this.providers[providerId];
        if (!provider.price_components) {
            return 0;
        }
        provider.price_components.forEach(priceComponent => {
            result += this.summary(providerId, priceComponent.formula);
        });
        return Math.round(result * 100) / 100;
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

