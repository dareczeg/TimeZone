let changed = false;

    class Store {
        /**
         * Get al the profiles from the localStorage
         * @returns parsed JSON profiles
         */
    static getProfiles() {
        let profiles;
        if (localStorage.getItem('profiles') === null) {
            profiles = [];
        } else {
            profiles = JSON.parse(localStorage.getItem('profiles'));
        }
        return profiles;
    }

    /**
     * Add the profile to the LocalStorage
     * @param {*} profile to be added
     */
    static addProfile(profile) {
        const profiles = Store.getProfiles();
        if (profile) {
            profiles.push(profile);
            localStorage.setItem('profiles', JSON.stringify(profiles));
        }
    }

    /**
     * Sort the elements in the localStorage in the ascending order
     */
    static sortAscending() {
        const profiles = Store.getProfiles();
        profiles.sort(({ monthTime: a }, { monthTime: b }) => a - b);
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    /**
     * Sort the elements in the localStorage in the descending order
     */
    static sortDescending() {
        const profiles = Store.getProfiles();
        profiles.sort(({ monthTime: a }, { monthTime: b }) => b - a);
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    /**
     * Update the parameters for the profile
     * @param {*} name of the profile to be updated
     * @param {*} value new
     */
    static updateProfile(name, value) {
        const profiles = Store.getProfiles();
        if (name && value) {
            profiles.forEach((profile) => {
                if (profile.name === name) {
                    profile.dayTime += value;
                    profile.weekTime += value;
                    profile.monthTime += value;
                    changed = true;
                }
            });
            localStorage.setItem('profiles', JSON.stringify(profiles));
        }
    }

    /**
     * Check if profile exists
     * @param {*} profile  to be checked
     * @returns boolean, true if exists, otherwise false
     */
    static profileExists(profile) {
        const profiles = Store.getProfiles();
        if (profile) {
            for (let i = 0; i < profiles.length; i++) {
                if (profiles[i] == profile) {
                    return true;
                }
            }
        } else return false;
    }

    /**
     * Remove profile from the LocalStorage.
     * @param {*} name to be deleted
     */
    static removeProfile(name) {
        const profiles = Store.getProfiles();
        if (name) {
            profiles.forEach((profile, index) => {
                if (profile.name == name) {
                    localStorage.removeItem(profile); //potential problem here
                    profiles.splice(index, 1);
                }
            });
            localStorage.setItem('profiles', JSON.stringify(profiles));
        }
    }

    /**
    * Reset the attribute 
    */
    static resetDaily() {
        const profiles = Store.getProfiles();
        profiles.forEach((profile) => {
            profile.dayTime = 0;
        });
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    /**
    * Reset the attribute 
    */
    static resetWeekly() {
        const profiles = Store.getProfiles();
        profiles.forEach((profile) => {
            profile.weekTime = 0;
        });
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    /**
    * Reset the attribute 
    */
    static resetMonthly() {
        const profiles = Store.getProfiles();
        profiles.forEach((profile) => {
            profile.monthTime = 0;
        });
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    /**
    * Retrieve total time from the LocalStorage.
    */
    static getTotalTime() {
        let totalTimer = 0;
        const profiles = Store.getProfiles();
        if (localStorage.getItem('profiles') !== null) {
            profiles.forEach((profile) => {
                totalTimer += profile.monthTime;
            });
        }
        return totalTimer;
    }

    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////

    /**
     * Get the list of all websites parsed from the LocalStorage.
     * @returns list of the websites
     */
    static getWebsites() {
        let websites;
        if (localStorage.getItem('websites') === null) {
            websites = [];
        } else {
            websites = JSON.parse(localStorage.getItem('websites'));
        }
        return websites;
    }

    /**
     * Add website to the storage.
     * @param {*} website to be added
     */
    static addWebsite(website) {
        const websites = Store.getWebsites();
        if (website) {
            websites.push(website);
            localStorage.setItem('websites', JSON.stringify(websites));
        }
    }

    /**
     * Remove website from the local storage.
     * @param {*} url of the website to be removed
     */
    static removeWebsite(url) {
        const websites = Store.getWebsites();
        if (url) {
            websites.forEach((website, index) => {
                if (website.url == url) {
                    localStorage.removeItem(website); //potential problem here
                    websites.splice(index, 1);
                }
            });
            localStorage.setItem('websites', JSON.stringify(websites));
        }
    }

    /**
     * Get specific website from the storage
     * @param {} stringURL 
     * @returns website object, otherwise false
     */
    static getWebsite(stringURL) {
        const websites = Store.getWebsites();
        for (let i = 0; i < websites.length; i++) {
            if (websites[i].url == stringURL) {
                return websites[i];
            } else {
                return false;
            }
        } 
    }

    /**
     * Check if website exists
     * @param {*} website  to be checked
     * @returns boolean, true if exists, otherwise false
     */
    static websiteExists(stringURL) {
        const websites = Store.getWebsites();
        if (stringURL) {
            for (let i = 0; i < websites.length; i++) {
                if (websites[i].url == stringURL) {
                    return true;
                }
            }
        } else return false;
    }

}
