const storage = {
    set: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    get: function (key) {
        const data = localStorage.getItem(key) || '[]';
        return JSON.parse(data);
    }
};

export default storage;


