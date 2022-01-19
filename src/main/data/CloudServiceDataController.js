let currentServices = new Map();
let services = [];

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
        services = serviceList;
        services.map(service => service.isFinished = false)
    }

    services() {
        return services;
    }

    currentServices() {
        return currentServices;
    }

    addServiceToCurrentList(serviceId) {
        if (serviceId == null) {
            throw new Error("Service Id cannot be null");
        }
        let service = services.find(service => service.id === serviceId);
        let newInstance = new Service(
            service.id,
            service.name,
            service.description,
            service.fields,
            service.providers
        );
        newInstance.isFinished = false;
        currentServices.set(serviceId, newInstance);
    }

    removeCurrentService(serviceId) {
        if (serviceId == null) {
            throw new Error("Service Id cannot be null");
        }
        console.log("removing service " + serviceId);
        currentServices.delete(serviceId);
    }

    saveNewService(serviceId, data) {
        const service = currentServices.get(serviceId);
        service.isFinished = true;
        for (const field of service.fields) {
            if (data[field.id]) {
                field.value = data[field.id];
            } else {
                field.value = field.defaultValue;
            }
        }
    }
}

