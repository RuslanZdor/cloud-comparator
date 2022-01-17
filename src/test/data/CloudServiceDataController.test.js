import ServiceDataController from '../../main/data/CloudServiceDataController';

let tempServices = [
    {
        name: "first service",
        id: 1,
        fields: [{
            label: "first field",
            id: "first_field",
            defaultValue: 0
        }]
    },
    { name: "second service", id: 2 }
];

test('After services are set, they has to be available to get', () => {
    let controller = new ServiceDataController(tempServices);
    expect(controller.services().length).toBe(2);
    expect(controller.services()[0].name).toBe("first service");
    expect(controller.services()[1].name).toBe("second service");
});

test('Initial state of current services after load has to be emtpy list', () => {
    let controller = new ServiceDataController(tempServices);
    expect(controller.currentServices().size).toBe(0);
});

test('Throw error in case of null serviceId', () => {
    let controller = new ServiceDataController(tempServices);
    expect(() => controller.addServiceToCurrentList(null)).toThrow();
});

test('When service added to current list - it has to be available in get function', () => {
    let controller = new ServiceDataController(tempServices);
    controller.addServiceToCurrentList(1);
    expect(controller.currentServices().size).toBe(1);
    expect(controller.currentServices().get(1).name).toBe("first service");
});

test('When service removed from current list - it has to be not available in get function', () => {
    let controller = new ServiceDataController(tempServices);
    controller.addServiceToCurrentList(1);
    controller.addServiceToCurrentList(2);
    controller.removeCurrentService(1);
    expect(controller.currentServices().size).toBe(1);
    expect(controller.currentServices().get(2).name).toBe("second service");
});

test('When service is finished - it has to be saved as flag', () => {
    let controller = new ServiceDataController(tempServices);
    controller.addServiceToCurrentList(1);
    controller.addServiceToCurrentList(2);
    controller.saveNewService(1, {});
    expect(controller.currentServices().get(1).isFinished).toBe(true);
    expect(controller.currentServices().get(2).isFinished).toBe(false);
});

test('When service saved without field value - default value should be populated in value', () => {
    let controller = new ServiceDataController(tempServices);
    controller.addServiceToCurrentList(1);
    controller.saveNewService(1, {});
    expect(controller.currentServices().get(1).fields[0].value).toBe(0);
});

test('When service saved with field value - value should be populated', () => {
    let controller = new ServiceDataController(tempServices);
    controller.addServiceToCurrentList(1);
    controller.saveNewService(1, { "first_field": 1 });
    expect(controller.currentServices().get(1).fields[0].value).toBe(1);
});

test('Test summary calculations, summary has to equals to all values multiplies on provider prices', () => {
    let controller = new ServiceDataController(tempServices);
    controller.addServiceToCurrentList(1);
    controller.saveNewService(1, { "first_field": 1 });
    expect(controller.currentServices().get(1).fields[0].value).toBe(1);
});