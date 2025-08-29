import React from 'react'

const PenelitianSection = () => {
    return (
        <div className="px-16 mt-16 pb-16">
            {/* Title */}
            <h1 className="font-bold text-5xl text-[#274B9C] mb-8 text-center">
                Kenali tim kita
            </h1>



            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <p className="text-[#274B9C] font-bold leading-relaxed text-justify text-2xl">
                        Lorem ipsum dolor sit amet consectetur. <br />
                        Nunc nisl quisque ante tellus tellus sodales.
                    </p>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-justify">
                        Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci donec sit quis malesuada et. Interdum a viverra viverra risus porttitor. Cursus porttitor integer lectus lacus orci dui penatibus eu semper.
                        <br />
                        Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci donec sit quis malesuada et. Interdum a viverra viverra risus porttitor. Cursus porttitor integer lectus lacus orci dui penatibus eu semper.
                    </p>
                </div>
            </div>
        </div>

    )
}


export default PenelitianSection