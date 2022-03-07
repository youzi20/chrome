export const getLocationSearch = (key?: string) => {
    const search = location.search;

    if (!search) return null;

    const params = {};

    location.search.substring(1).split("&").forEach(item => {
        const [key, value] = item.split("=");

        params[key] = value;
    });

    if (!key) return params;

    if (key && params[key]) return params[key];

    return null;
}