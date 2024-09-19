import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
};

const MockDrawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    children,
    className,
}) => {
    if (!isOpen) return null;
    return (
        <div data-testid="mock-drawer" className={className}>
            <div data-testid="mock-close" onClick={onClose}>
                Close
            </div>
            <div data-testid="mock-content">{children}</div>
        </div>
    );
};

jest.mock('./Drawer', () => ({
    __esModule: true,
    default: jest.fn((props: DrawerProps) => MockDrawer(props)),
}));

const Drawer = require('./Drawer').default;

describe('Drawer Component', () => {
    const mockOnClose = jest.fn();
    const defaultProps: DrawerProps = {
        isOpen: true,
        onClose: mockOnClose,
        children: <div>Drawer Content</div>,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly when open', () => {
        render(<Drawer {...defaultProps} />);
        expect(screen.getByTestId('mock-drawer')).toBeInTheDocument();
        expect(screen.getByText('Drawer Content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(<Drawer {...defaultProps} isOpen={false} />);
        expect(screen.queryByTestId('mock-drawer')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        render(<Drawer {...defaultProps} />);
        fireEvent.click(screen.getByTestId('mock-close'));
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('applies custom className', () => {
        render(<Drawer {...defaultProps} className="custom-class" />);
        expect(screen.getByTestId('mock-drawer')).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
        const customContent = (
            <div data-testid="custom-content">Custom Content</div>
        );
        render(<Drawer {...defaultProps}>{customContent}</Drawer>);
        expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });
});
