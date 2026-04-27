import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
                        width: 156,
                        height: 156,
                        border: '4px solid #2a2520',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2a2520',
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontStyle: 'italic',
                        fontSize: 70,
                        fontWeight: 400,
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                        paddingBottom: 6,
                    }}
                >
                    SMA
                </div>
            </div>
        ),
        size
    );
}
