import type { Rich } from '@/i18n';

/** Renders a dictionary heading with its one emphasised word in the serif italic. */
const RichText = ({ value }: { value: Rich }) => (
    <>
        {value[0]}
        <em className="serif-it">{value[1]}</em>
        {value[2]}
    </>
);

export default RichText;
