import ServiceDataController from '../../main/data/CloudServiceDataController';

let tempServices = [
    {
        name: "first service",
        id: 1,
        fields: [{
            label: "first field",
            header: "{value} is value",
            id: "first_field",
            defaultValue: 0
        }]
    },
    { name: "second service", id: 2 }
];

test('After services are set, they has to be available to get', () => {
    let controller = new ServiceDataController(tempServices);
    expect(controller.getServices().length).toBe(2);
    expect(controller.getServices()[0].name).toBe("first service");
    expect(controller.getServices()[1].name).toBe("second service");
});

test('Initial state of current services after load has to be emtpy list', () => {
    let controller = new ServiceDataController(tempServices);
    expect(controller.getCurrentServices().size).toBe(0);
});

test('Throw error in case of null serviceId', () => {
    let controller = new ServiceDataController(tempServices);
    expect(() => controller.addServiceToCurrentList(null)).toThrow();
});

test('When service added to current list - it has to be available in get function', () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    expect(controller.getCurrentServices().size).toBe(1);
    expect(controller.getCurrentServices().get(firstUUID).name).toBe("first service");
});

test('When service removed from current list - it has to be not available in get function', () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    const secondUUID = controller.addServiceToCurrentList(2);
    controller.removeCurrentService(firstUUID);
    expect(controller.getCurrentServices().size).toBe(1);
    expect(controller.getCurrentServices().get(secondUUID).name).toBe("second service");
});

test('When service is finished - it has to be saved as flag', () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    const secondUUID = controller.addServiceToCurrentList(2);
    controller.saveNewService(firstUUID, {});
    expect(controller.getCurrentServices().get(firstUUID).isFinished).toBe(true);
    expect(controller.getCurrentServices().get(secondUUID).isFinished).toBe(false);
});

test('When service saved without field value - default value should be populated in value', () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    controller.saveNewService(firstUUID, {});
    expect(controller.getCurrentServices().get(firstUUID).fields[0].value).toBe(0);
});

test('When service saved with field value - value should be populated', () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    controller.saveNewService(firstUUID, { "first_field": 1 });
    expect(controller.getCurrentServices().get(firstUUID).fields[0].value).toBe(1);
});

test('Test summary calculations, summary has to equals to all values multiplies on provider prices', () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    controller.saveNewService(firstUUID, { "first_field": 1 });
    expect(controller.getCurrentServices().get(firstUUID).fields[0].value).toBe(1);
});

test("To modify service data need to set flag isFinished to false", () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    controller.saveNewService(firstUUID, {});
    expect(controller.getCurrentServices().get(firstUUID).isFinished).toBe(true);
    controller.editService(firstUUID);
    expect(controller.getCurrentServices().get(firstUUID).isFinished).toBe(false);
})

test("After remove all services - current set should be empty", () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    controller.saveNewService(firstUUID, {});
    controller.addServiceToCurrentList(2);
    controller.removeAllCurrentService();
    expect(controller.getCurrentServices().size).toBe(0);
})

test("Test saving of service name as field", () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    controller.saveNewService(firstUUID, { "service_name": "New Name" });
    expect(controller.getCurrentServices().get(firstUUID).name).toBe("New Name");
})

test("Header should contain information from each field", () => {
    let controller = new ServiceDataController(tempServices);
    const firstUUID = controller.addServiceToCurrentList(1);
    controller.saveNewService(firstUUID, { "first_field": 1 });
    expect(controller.getCurrentServices().get(firstUUID).headerSummary()).toBe("1 is value");
})