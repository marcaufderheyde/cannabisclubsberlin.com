import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Background from '@/app/components/Home/Background';
import useWindowSize from '@/app/helpers/useWindowSize';

jest.mock('@/app/helpers/useWindowSize');

describe('Background Component', () => {
    beforeEach(() => {
        (useWindowSize as jest.Mock).mockReturnValue({
            width: 1024,
            height: 768,
        });

        const mockGetContext = jest.fn();
        const mockFill = jest.fn();
        const mockBeginPath = jest.fn();
        const mockMoveTo = jest.fn();
        const mockBezierCurveTo = jest.fn();
        const mockLineTo = jest.fn();
        const mockClosePath = jest.fn();
        const mockClearRect = jest.fn();
        const mockCreateRadialGradient = jest.fn().mockReturnValue({
            addColorStop: jest.fn(),
        });

        mockGetContext.mockReturnValue({
            fill: mockFill,
            beginPath: mockBeginPath,
            moveTo: mockMoveTo,
            bezierCurveTo: mockBezierCurveTo,
            lineTo: mockLineTo,
            closePath: mockClosePath,
            clearRect: mockClearRect,
            createRadialGradient: mockCreateRadialGradient,
        });

        jest.spyOn(
            HTMLCanvasElement.prototype,
            'getContext'
        ).mockImplementation(mockGetContext);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the Background component and draws on the canvas', () => {
        render(<Background />);

        const canvas = document.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
        expect(canvas?.width).toBe(1024);

        const context = canvas?.getContext('2d');
        expect(context?.beginPath).toHaveBeenCalled();
        expect(context?.moveTo).toHaveBeenCalledWith(0, expect.any(Number));
        expect(context?.bezierCurveTo).toHaveBeenCalledWith(
            2000,
            400,
            expect.any(Number),
            50,
            4220,
            -100
        );
        expect(context?.fillStyle).toBeTruthy();
        expect(context?.fill).toHaveBeenCalled();
    });

    it('clears the canvas on component unmount', () => {
        const { unmount } = render(<Background />);
        const canvas = document.querySelector('canvas');
        const context = canvas?.getContext('2d');

        unmount();

        expect(context?.clearRect).toHaveBeenCalledWith(
            0,
            0,
            canvas?.width,
            canvas?.height
        );
    });
});
