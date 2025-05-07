import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); //1 hour

const get = (key) => cache.get(key);
const set = (key, value, ttl = 3600) => cache.set(key, value, ttl);
const del = (key) => cache.del(key);

export default {
    get,
    set,
    del
};
