import React, { useEffect,Suspense, lazy } from "react";
import Loading from "../components/common/Loading";
const NavbarComponent = lazy(() => import('../components/common/navbar'));
const ContactCover = lazy(() => import('../components/contact/cover'));
const MainContent = lazy(() => import('../components/contact/content'));
const Footer = lazy(() => import('../components/common/footer'));

const Contact = () => {
  useEffect(() => {
    const func = () => {
      document.title = "Contact | NVCTI";
    };
    func();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <NavbarComponent variant="light"/>
      <ContactCover />
      <MainContent />
      <Footer extraStyle={{ marginTop: "0" }} />
    </Suspense>
  );
};

export default Contact;
