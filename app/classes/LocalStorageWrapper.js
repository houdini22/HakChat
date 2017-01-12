import {getPropertyByPath, setPropertyByPath} from '../helpers/object-helper';

const key = 'HakChat';

class LocalStorageWrapper {
    constructor() {
        this._data = JSON.parse(localStorage.getItem(key) || '{}');
    }

    getByPath(path, defaultValue = null) {
        return getPropertyByPath(this._data, path, defaultValue)
    }

    setByPath(path, value) {
        setPropertyByPath(this._data, path, value);
        return this;
    }

    save() {
        localStorage.setItem(key, JSON.stringify(this._data));
        return this;
    }
}

export default LocalStorageWrapper;