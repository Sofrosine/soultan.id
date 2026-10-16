import Image from 'next/image';

type Props = {
    /** Still used as the poster frame, the list thumbnail fallback, and for link previews. */
    image: string;
    /** When present, the preview plays instead of showing the still. */
    video?: string;
    /** Portrait recordings are shown whole against this colour rather than cropped to the slot. */
    background?: string;
    alt: string;
    sizes: string;
    priority?: boolean;
};

/**
 * One preview slot for a project. Internal apps have no public URL to link to, so the only
 * honest way to show them is a short screen recording — hence the video branch.
 * The container around this element supplies position/overflow; both branches fill it.
 */
const ProjectMedia = ({ image, video, background, alt, sizes, priority }: Props) => {
    if (video) {
        return (
            <video
                className="media-fill"
                style={background ? { objectFit: 'contain', background } : undefined}
                src={video}
                poster={image}
                aria-label={alt}
                autoPlay
                muted
                loop
                playsInline
                preload={priority ? 'auto' : 'metadata'}
            />
        );
    }
    return <Image src={image} alt={alt} fill sizes={sizes} priority={priority} />;
};

export default ProjectMedia;
