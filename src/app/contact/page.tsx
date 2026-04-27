import { Metadata } from 'next';
import ContactView from './ContactView';

export const metadata: Metadata = {
    title: 'Contact | Soultan Muhammad Albar',
    description: 'Open to engineering work, contract or full-time. Email, WhatsApp, or send a message.',
};

export default function ContactPage() {
    return <ContactView />;
}
