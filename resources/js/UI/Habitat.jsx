import React from "react";
import Wave1 from "../images/Wave1.png";
import Wave2 from "../images/Wave2.png";
import Wave3 from "../images/Wave3.png";
import Wave4 from "../images/Wave4.png";
import HabitatImg from "../images/habitat.png";

export default function HabitatSection() {
    return (
        <section
            className="py-16 sm:py-20 bg-white font-sans"
            style={{ fontFamily: "Inter, sans-serif" }}
            aria-labelledby="habitat-heading"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <header className="text-center mb-10 sm:mb-14">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#6D8FD4] ">
                        Kenali habitat dugong
                    </h3>
                    <h2
                        id="habitat-heading"
                        className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#274B9C]"
                    >
                        Habitat & sebaran
                    </h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 md:items-stretch">
                    <div className="md:col-span-8 h-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-6 h-full ">
                            <article className="rounded-[24px] bg-[#F3F4F6] p-6 shadow-sm   flex flex-col ">
                                <img
                                    src={Wave1}
                                    alt="Wave1"
                                    className="w-7 h-7 object-contain"
                                    loading="lazy"
                                />
                                <div className="flex-1 flex flex-col justify-between mt-2">
                                    <div>
                                        <h3 className="text-[#274B9C] text-[20px] sm:text-[17px] font-semibold pt-5">
                                            Lorem ipsum dolor sit amet
                                            consectetur.
                                        </h3>
                                        <p className="text-[#6D7280] font-medium text-[14px] sm:text-[11px] leading-relaxed pt-2">
                                            Lorem ipsum dolor sit amet
                                            consectetur. In porta nec est et
                                            diam. Cursus risus malesuada id
                                            varius cras morbi eget est tellus.
                                            Sit senectus massa risus lectus.
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <article className="rounded-[24px] bg-[#F3F4F6] p-6 shadow-sm  flex flex-col">
                                <img
                                    src={Wave2}
                                    alt="Wave2"
                                    className="w-7 h-7 object-contain"
                                    loading="lazy"
                                />
                                <div className="flex-1 flex flex-col justify-between mt-2">
                                    <div>
                                        <h3 className="text-[#274B9C] text-[20px] sm:text-[17px] font-semibold pt-5">
                                            Lorem ipsum dolor sit amet
                                            consectetur.
                                        </h3>
                                        <p className="text-[#6D7280] font-medium text-[14px] sm:text-[11px] leading-relaxed pt-2">
                                            Lorem ipsum dolor sit amet
                                            consectetur. In porta nec est et
                                            diam. Cursus risus malesuada id
                                            varius cras morbi eget est tellus.
                                            Sit senectus massa risus lectus.
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <article className="rounded-[24px] bg-[#F3F4F6] p-6 shadow-sm  flex flex-col">
                                <img
                                    src={Wave3}
                                    alt="Wave3"
                                    className="w-7 h-7 object-contain"
                                    loading="lazy"
                                />
                                <div className="flex-1 flex flex-col justify-between mt-2">
                                    <div>
                                        <h3 className="text-[#274B9C] text-[20px] sm:text-[17px] font-semibold pt-5">
                                            Lorem ipsum dolor sit amet
                                            consectetur.
                                        </h3>
                                        <p className="text-[#6D7280] font-medium text-[14px] sm:text-[11px] leading-relaxed pt-2">
                                            Lorem ipsum dolor sit amet
                                            consectetur. In porta nec est et
                                            diam. Cursus risus malesuada id
                                            varius cras morbi eget est tellus.
                                            Sit senectus massa risus lectus.
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <article className="rounded-[24px] bg-[#F3F4F6] p-6 shadow-sm  flex flex-col">
                                <img
                                    src={Wave4}
                                    alt="Wave4"
                                    className="w-7 h-7 object-contain"
                                    loading="lazy"
                                />
                                <div className="flex-1 flex flex-col justify-between mt-2">
                                    <div>
                                        <h3 className="text-[#274B9C] text-[20px] sm:text-[17px] font-semibold pt-5">
                                            Lorem ipsum dolor sit amet
                                            consectetur.
                                        </h3>
                                        <p className="text-[#6D7280] font-medium text-[14px] sm:text-[11px] leading-relaxed pt-2">
                                            Lorem ipsum dolor sit amet
                                            consectetur. In porta nec est et
                                            diam. Cursus risus malesuada id
                                            varius cras morbi eget est tellus.
                                            Sit senectus massa risus lectus.
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <aside className="md:col-span-4 h-full  md:self-stretch">
                        <div className="relative h-[420px] sm:h-[480px] rounded-[8px] overflow-hidden shadow-sm ring-1 ring-black/5">
                            <img
                                src={HabitatImg}
                                alt="Peta habitat dan sebaran dugong"
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute inset-x-0 top-0 p-8">
                                <h3 className="text-white text-2xl lg:text-3xl font-semibold drop-shadow">
                                    Lorem ipsum <br />
                                    dolor sit amet consectetur. In <br /> porta
                                    nec est et <br /> diam.
                                </h3>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
