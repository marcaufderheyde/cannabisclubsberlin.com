export default class ClassNameMatcher {
    static getCustomWidth(className: string) {
        const regexForCustomWidthClass = /w-\[(\d+(?:\/\d+)?px)\]/;
        const matches = className.match(regexForCustomWidthClass);
        return matches ? matches[1] : '';
    }
    static getCustomHeight(className: string) {
        const regexForCustomWidthClass = /h-\[(\d+(?:\/\d+)?px)\]/;
        const matches = className.match(regexForCustomWidthClass);
        return matches ? matches[1] : '';
    }
}
