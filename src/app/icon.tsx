import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#f9f7f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: 56,
                        height: 56,
                        border: '2px solid #2a2520',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2a2520',
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontStyle: 'italic',
                        fontSize: 24,
                        fontWeight: 400,
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                        paddingBottom: 2,
                    }}
                >
                    SMA
                </div>
            </div>
        ),
        size
    );
}
