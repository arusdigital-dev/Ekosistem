import { WorldMap } from "@/Components/ui/world-map";
import React from "react";

export default function Populasi() {
    return (
        <div
            className="py-20 px-8 bg-white"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            <div className="container mx-auto text-center">
                <h1 className="text-3xl lg:text-4xl font-bold text-[#6D8FD4] mb-4">
                    1000+{" "}
                    <span className="text-[#274B9C]">
                        Populasi dugong di dunia
                    </span>
                </h1>
                <h3 className="font-bold text-[#4B5563] mb-6">
                    Lorem ipsum dolor sit amet consectetur. In porta nec est et
                    diam. <br /> Cursus risus malesuada id varius cras morbi
                    eget est tellus.
                </h3>
            </div>
            <div className="max-w-6xl mx-auto">
                <WorldMap
                    dots={[
                        {
                            start: {
                                lat: 64.2008,
                                lng: -149.4937,
                            },
                            end: {
                                lat: 34.0522,
                                lng: -118.2437,
                            },
                        },
                        {
                            start: { lat: 64.2008, lng: -149.4937 },
                            end: { lat: -15.7975, lng: -47.8919 },
                        },
                        {
                            start: { lat: -15.7975, lng: -47.8919 },
                            end: { lat: 38.7223, lng: -9.1393 },
                        },
                        {
                            start: { lat: 51.5074, lng: -0.1278 },
                            end: { lat: 28.6139, lng: 77.209 },
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 },
                            end: { lat: 43.1332, lng: 131.9113 },
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 },
                            end: { lat: -1.2921, lng: 36.8219 },
                        },
                    ]}
                />
            </div>
        </div>
    );
}
