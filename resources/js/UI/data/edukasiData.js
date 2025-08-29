import Wave1 from "../../images/Wave1.png";
import Wave2 from "../../images/Wave2.png";
import Wave3 from "../../images/Wave3.png";

// Data untuk komponen Edukasi
export const edukasiData = {
    header: {
        subtitle: "Edukasi & Konservasi Laut",
        title: "Eksplorasi tiga penjaga laut kita"
    },
    cards: [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            wave: Wave2,
            title: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing",
            desc: "Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.",
            buttonText: "Selengkapnya"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            wave: Wave1,
            title: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore",
            desc: "Cursus risus malesuada id verius orci morbi eget est tellus.",
            buttonText: "Selengkapnya"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            wave: Wave3,
            title: "Magna Aliqua Ut Enim Ad Minim Veniam Quis Nostrud",
            desc: "Sit senectus massa risus lectus et viverra faucibus.",
            buttonText: "Selengkapnya"
        }
    ]
};

// Konfigurasi styling untuk Edukasi
export const edukasiConfig = {
    primaryColor: "#274B9C",
    subtitleColor: "#3b82f6",
    buttonColor: "#ffffff",
    buttonTextColor: "#274B9C",
    cardHeight: "400px",
    borderRadius: "rounded-3xl",
    shadowClass: "shadow-2xl",
    gradientOverlay: "bg-gradient-to-r from-black/60 via-black/40 to-transparent",
    animation: {
        gridGap: "14vw",
        gridRows: "repeat(3, 25vw)",
        paddingBottom: "calc(3 * 0.5em)"
    }
};