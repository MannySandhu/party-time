import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800 }); //30 minutes

const get = (key) => cache.get(key);
const set = (key, value, ttl = 1800) => cache.set(key, value, ttl);
const del = (key) => cache.del(key);

export default {
    get,
    set,
    del
};
