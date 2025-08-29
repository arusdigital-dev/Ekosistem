import React from 'react'
import ArtikelSections from '../UI-Artikel/ArtikelSections';
import Footer from '../components/Footer';
import ArtikelKonten from '../UI-Artikel/ArtikelKonten';

const Artikel = () => {
    return (
        <>
            <ArtikelSections />
            <ArtikelKonten />
            <Footer />
        </>
    )
}

export default Artikel