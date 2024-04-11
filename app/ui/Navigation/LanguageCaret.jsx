export default function LanguageCaret({ rotateToggle }) {
    var styling = "w-2.5 h-2.5 ms-2.5";
    return (
        <svg className={rotateToggle ? styling : styling + " rotate-180"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
    );
}