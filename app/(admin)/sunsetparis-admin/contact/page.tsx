import ContactForm from '@/components/shared/admin/ContactForm';
import { getContact } from '@/lib/actions/contact.actions';
import React from 'react';

const page = async () => {
  const contact = await getContact();

  return (
    <main className="admin-main">
      <section className="w-full space-y-4 justify-center items-center">
        <h1 className="header text-dark-700 text-center">
          Welcome Again Adélia 👋
        </h1>
        <p className="text-dark-700 text-center">
          Start managing your contact section.
        </p>
      </section>

      <div className="wrapper my-8 w-full">
        <ContactForm contact={contact} />
      </div>
    </main>
  );
};

export default page;
