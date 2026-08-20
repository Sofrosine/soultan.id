import { Metadata } from 'next';
import StormShell from '@/components/storm/StormShell';
import ContactStorm from '@/components/storm/pages/ContactStorm';

export const metadata: Metadata = {
    title: 'Contact | Soultan Muhammad Albar',
    description: 'Open to engineering work, contract or full-time. Email, WhatsApp, or send a message.',
};

export default function ContactPage() {
    return (
        <StormShell>
            <ContactStorm />
        </StormShell>
    );
}
