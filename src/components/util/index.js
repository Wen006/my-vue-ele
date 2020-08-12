export function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export function isFunction(obj){
    return typeof obj == "function";
}
 

export function getIntl({id,defaultMessage}){
    return defaultMessage;
}