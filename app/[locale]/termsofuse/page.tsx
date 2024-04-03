import ImprintContent from './terms-of-use-content';

export default function TermsOfUseContent() {
    return (
        <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
            <ImprintContent />
            <div className='w-2/3'></div>
        </div>
    );
}
