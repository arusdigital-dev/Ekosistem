import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white px-28 font-semibold">
            <div className="bg-[#F3F4F6] rounded-t-2xl py-12 p-8 mx-4">
                <div className="max-w-6xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Logo and Description */}
                        <div className="md:col-span-1">
                            <div className="bg-[#274B9C] rounded-full px-52 py-20 mb-6 inline-block">
                                <span className="text-white font-bold text-lg">Logo</span>
                            </div>
                            <p className="text-lg leading-tight font-medium -mr-24 ml-10">
                                Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius cras morbi eget est tellus. Sit senectus massa risus lectus turpis malesuada mattis. Nibh mi tellus sed u
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="md:col-span-1 ml-44">
                            <h3 className="font-semibold mb-4 text-sm" style={{ color: '#274B9C' }}>Navigation</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:opacity-80 transition-colors text-xs" style={{ color: '#274B9C' }}>Beranda</a></li>
                                <li><a href="#" className="hover:opacity-80 transition-colors text-xs" style={{ color: '#274B9C' }}>Peta</a></li>
                                <li><a href="#" className="hover:opacity-80 transition-colors text-xs" style={{ color: '#274B9C' }}>Ekosistem</a></li>
                                <li>
                                    <div className="ml-4">
                                        <a href="#" className="hover:opacity-80 transition-colors flex items-center text-xs" style={{ color: '#274B9C' }}>
                                            <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Mangrove
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="ml-4">
                                        <a href="#" className="hover:opacity-80 transition-colors flex items-center text-xs" style={{ color: '#274B9C' }}>
                                            <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Padang Lamun
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="ml-4">
                                        <a href="#" className="hover:opacity-80 transition-colors flex items-center text-xs" style={{ color: '#274B9C' }}>
                                            <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Dugong
                                        </a>
                                    </div>
                                </li>
                                <li><a href="#" className="hover:opacity-80 transition-colors text-xs" style={{ color: '#274B9C' }}>Publikasi</a></li>
                                <li>
                                    <div className="ml-4">
                                        <a href="#" className="hover:opacity-80 transition-colors flex items-center text-xs" style={{ color: '#274B9C' }}>
                                            <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Berita
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="ml-4">
                                        <a href="#" className="hover:opacity-80 transition-colors flex items-center text-xs" style={{ color: '#274B9C' }}>
                                            <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Kegiatan Penelitian
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="ml-4">
                                        <a href="#" className="hover:opacity-80 transition-colors flex items-center text-xs" style={{ color: '#274B9C' }}>
                                            <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Artikel
                                        </a>
                                    </div>
                                </li>
                                <li><a href="#" className="hover:opacity-80 transition-colors text-xs" style={{ color: '#274B9C' }}>Tentang</a></li>
                                <li>
                                    <div className="ml-4">
                                        <a href="#" className="hover:opacity-80 transition-colors flex items-center text-xs" style={{ color: '#274B9C' }}>
                                            <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Peneliti
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="ml-4">
                                        <a href="#" className="hover:opacity-80 transition-colors flex items-center text-xs" style={{ color: '#274B9C' }}>
                                            <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Kontak
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="md:col-span-1">
                            <h3 className="font-semibold mb-4 text-sm" style={{ color: '#274B9C' }}>Contact</h3>
                            <div className="space-y-4">
                                <p className="text-xs leading-relaxed" style={{ color: '#274B9C' }}>
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius cras morbi eget est tellus. Sit senectus massa risus lectus turpis malesuada mattis. Nibh mi tellus sed u
                                </p>
                                <p className="text-xs leading-relaxed" style={{ color: '#274B9C' }}>
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius cras morbi eget est tellus. Sit senectus massa risus lectus turpis malesuada mattis. Nibh mi tellus sed u
                                </p>
                            </div>

                            {/* Social Media */}
                            <div className="mt-28">
                                <h4 className="font-semibold mb-3 text-sm" style={{ color: '#274B9C' }}>Ikuti Kami</h4>
                                <div className="flex space-x-3">
                                    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-colors">
                                        <svg className="w-6 h-6" fill="#274B9C" viewBox="0 0 24 24">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-colors">
                                        <svg className="w-6 h-6" fill="#274B9C" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-colors">
                                        <svg className="w-6 h-6" fill="#274B9C" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-gray-300 pt-6">
                        <div className="text-sm flex flex-wrap items-center gap-x-6 gap-y-2" style={{ color: '#274B9C' }}>
                            <span>© 2025 Ekosistem Pesisir. All rights reserved.</span>
                            <a href="#" className="hover:opacity-80 transition-colors">Privacy Statement</a>
                            <a href="#" className="hover:opacity-80 transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;