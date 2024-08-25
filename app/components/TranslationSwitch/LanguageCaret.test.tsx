import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageCaret from './LanguageCaret';

describe('LanguageCaret Component', () => {
    it('renders the LanguageCaret with the correct classes when rotateToggle is true', () => {
        render(<LanguageCaret rotateToggle={true} />);

        const caretElement = screen.getByLabelText('language caret');
        expect(caretElement).toBeInTheDocument();
        expect(caretElement).toHaveClass('w-2.5 h-2.5 ms-2.5');
        expect(caretElement).not.toHaveClass('rotate-180');
    });

    it('renders the LanguageCaret with the correct classes when rotateToggle is false', () => {
        render(<LanguageCaret rotateToggle={false} />);

        const caretElement = screen.getByLabelText('language caret');
        expect(caretElement).toBeInTheDocument();
        expect(caretElement).toHaveClass('w-2.5 h-2.5 ms-2.5 rotate-180');
    });
});
