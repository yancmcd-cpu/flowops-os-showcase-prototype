import Spline from '@splinetool/react-spline';

export default function SplineBackgroundDepth() {
    return (
        <div
            style={{
                width: '120vw', // Overscale for bleed
                height: '120vh',
                position: 'fixed',
                top: '-10vh',
                left: '-10vw',
                zIndex: 0,
                opacity: 0.25, // More subtle
                filter: 'saturate(0.1) contrast(1.1) brightness(0.6) blur(2px)', // Desaturated and blurred for distance
                pointerEvents: 'none'
            }}
        >
            <Spline scene="https://prod.spline.design/Vv7549aIemdYYclR/scene.splinecode" />
        </div>
    );
}
