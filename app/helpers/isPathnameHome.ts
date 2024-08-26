export default function isPathNameHome(pathname: string) {
    const match = /^\/([a-zA-Z]{2})(\/)?$/.exec(pathname);
    return match;
}
