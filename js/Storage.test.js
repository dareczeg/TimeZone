let storage = require('./Storage');

test('When the storage is empty, new array should be initialised', () => {
    localStorage.clear();
    const profilesArray = storage.store.getProfiles();
    expect(profilesArray).toStrictEqual([]);
});

test('When the storage contains item, array should be retrieved', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 0, weekTime: 0, monthTime: 0 };
    const profile2 = { name: "abc", dayTime: 0, weekTime: 0, monthTime: 0 };
    const profile3 = { name: "abc", dayTime: 0, weekTime: 0, monthTime: 0 };
    storage.store.addProfile(profile);
    storage.store.addProfile(profile2);
    storage.store.addProfile(profile3);
    const profilesArray = storage.store.getProfiles();
    expect(Array.isArray([profilesArray])).toBe(true);
});

test('When an item is added, array size should increase by 1', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 0, weekTime: 0, monthTime: 0 };
    storage.store.addProfile(profile);
    const profilesArray = storage.store.getProfiles();
    expect(profilesArray.length).toEqual(1);
});

test('When an item added is null, array size should remain the same', () => {
    localStorage.clear();
    const profile = null;
    storage.store.addProfile(profile);
    const profilesArray = storage.store.getProfiles();
    expect(profilesArray.length).toEqual(0);
});

test('When one of the attributes to be updated is null, there should not be an update', () => {
    localStorage.clear();
    storage.store.addProfile({ name: "abc", dayTime: 0, weekTime: 0, monthTime: 0 });
    storage.store.updateProfile(null, 25);
    const profilesArray = storage.store.getProfiles();
    expect(profilesArray[0].dayTime).toEqual(0);
    storage.store.updateProfile("abc", null);
    expect(profilesArray[0].dayTime).toEqual(0);
    storage.store.updateProfile(null, null);
    expect(profilesArray[0].dayTime).toEqual(0);
});

test('When there is an update request, all attributes should be updated', () => {
    localStorage.clear();
    storage.store.addProfile({ name: "abc", dayTime: 0, weekTime: 0, monthTime: 0 });
    storage.store.updateProfile("abc", 25);
    const profilesArray = storage.store.getProfiles();
    expect(profilesArray[0].dayTime).toEqual(25);
    expect(profilesArray[0].weekTime).toEqual(25);
    expect(profilesArray[0].monthTime).toEqual(25);
});

test('When there is a sort request, array items should be sorted', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 10 };
    const profile2 = { name: "def", dayTime: 30, weekTime: 20, monthTime: 20 };
    const profile3 = { name: "ghi", dayTime: 30, weekTime: 30, monthTime: 30 };
    storage.store.addProfile(profile);
    storage.store.addProfile(profile2);
    storage.store.addProfile(profile3);
    const profilesArray = storage.store.getProfiles();
    storage.store.sortAscending();
    let isAscending, isDescending;
    for (i = 0; i <= profilesArray.length; i++) {
        if (profilesArray[i] <= profilesArray[i + 1]) isAscending = true;
    }
    expect(isAscending).toBe(true);
    storage.store.sortDescending();
    for (i = 0; i <= profilesArray.length; i++) {
        if (profilesArray[i] >= profilesArray[i + 1]) isDescending = true;
    }
    expect(isDescending).toBe(true);
});

test('When an item exists, array item should be deleted', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 10 };
    const profile2 = { name: "def", dayTime: 20, weekTime: 20, monthTime: 20 };
    storage.store.addProfile(profile);
    storage.store.addProfile(profile2);
    storage.store.removeProfile("abc");
    const profilesArray = storage.store.getProfiles();
    expect(profilesArray.length).toEqual(1);
});

test('When an item does not exists, array size should remain the same', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 10 };
    storage.store.addProfile(profile);
    storage.store.removeProfile("def");
    const profilesArray = storage.store.getProfiles();
    expect(profilesArray.length).toEqual(1);
});

test('When an item to be removed is null, array should remain the same', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 10 };
    storage.store.addProfile(profile);
    storage.store.removeProfile(null);
    const profilesArray = storage.store.getProfiles();
    expect(profilesArray.length).toEqual(1);
});

test('When an item exists in the array, should return true', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 10 };
    storage.store.addProfile(profile);
    expect(storage.store.profileExists(profile)).toBe(true);
});

test('When an item does not exists in the array, should return false', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 10 };
    storage.store.addProfile(profile);
    expect(storage.store.profileExists(null)).toBe(false);
});

test('When a set of items exist in storage, should return total month time', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 10 };
    const profile2 = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 30 };
    const profile3 = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 50 };
    storage.store.addProfile(profile);
    storage.store.addProfile(profile2);
    storage.store.addProfile(profile3);
    expect(storage.store.getTotalTime()).toEqual(90);
});

test('When an one of the items in storage is null, should return total month time', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 10 };
    const profile2 = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 30 };
    storage.store.addProfile(profile);
    storage.store.addProfile(profile2);
    storage.store.addProfile(null);
    expect(storage.store.getTotalTime()).toEqual(40);
});

test('When a reset daily request is send, dayTime attribute for every single object in the array should be reset to 0.', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 10, monthTime: 10 };
    storage.store.addProfile(profile);
    storage.store.resetDaily()
    expect(storage.store.getProfiles()[0].dayTime).toEqual(0);
});

test('When an reset weekly request is send, weekTime attribute for every single object in the array should be reset to 0.', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 20, monthTime: 30 };
    storage.store.addProfile(profile);
    storage.store.resetWeekly();
    expect(storage.store.getProfiles()[0].weekTime).toEqual(0);
});

test('When an reset monthly request is send, monthTime attribute for every single object in the array should be reset to 0.', () => {
    localStorage.clear();
    const profile = { name: "abc", dayTime: 10, weekTime: 20, monthTime: 30 };
    storage.store.addProfile(profile);
    storage.store.resetMonthly();
    expect(storage.store.getProfiles()[0].monthTime).toEqual(0);
});

test('When a getWebsite request is send, return value should be an object.', () => {
    localStorage.clear();
    const website = { url: "abc", notification: 10, limit: 20 };
    storage.store.addWebsite(website);
    expect(typeof storage.store.getWebsite("abc")).toBe('object');
});

test('When a website requested doesn not exist, return value should be false.', () => {
    localStorage.clear();
    const website = { url: "abc", notification: 10, limit: 20 };
    storage.store.addWebsite(website);
    expect(storage.store.getWebsite("def")).toBe(false);
});

test('When an get website request doesn not exist, return value should be false.', () => {
    localStorage.clear();
    const website = { url: "abc", notification: 10, limit: 20 };
    storage.store.addWebsite(website);
    expect(storage.store.getWebsite(null)).toBe(false);
});













