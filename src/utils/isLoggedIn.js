import { getToken } from "../storage/token";

export default () => {
    const token = getToken();

    return token && token !== 'undefined';
}
