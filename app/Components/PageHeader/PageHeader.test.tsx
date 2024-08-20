import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageHeader from './PageHeader';

describe('PageHeader Component', () => {
    it('renders the PageHeader with correct text', () => {
        const testText = 'Test Header';
        const testClassName = 'header-class';

        render(<PageHeader text={testText} className={testClassName} />);

        expect(screen.getByText(testText)).toBeInTheDocument();
        expect(screen.getByText(testText)).toHaveClass(testClassName);
    });
});
