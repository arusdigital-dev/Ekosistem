// Data untuk komponen Mitra
export const mitraData = {
    header: {
        title: "Mitra kami"
    },
    partners: [
        {
            id: 1,
            name: "Nike",
            style: "normal"
        },
        {
            id: 2,
            name: "HUSH",
            style: "normal"
        },
        {
            id: 3,
            name: "PUMA",
            style: "normal"
        },
        {
            id: 4,
            name: "SHOEI",
            style: "bordered"
        },
        {
            id: 5,
            name: "Marc",
            style: "normal"
        },
        {
            id: 6,
            name: "Supreme",
            style: "italic"
        }
    ],
    hero: {
        image: {
            src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
            alt: "Underwater marine life"
        },
        title: "Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.",
        description: "Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.\nCursus risus malesuada id varius orci morbi eget est tellus.\nSit senectus massa risus lectus.",
        button: {
            text: "Lapor",
            icon: "→"
        }
    }
};

// Konfigurasi styling untuk Mitra
export const mitraConfig = {
    primaryColor: "#274B9C",
    partnerColor: "#9ca3af",
    buttonColor: "#ffffff",
    buttonTextColor: "#2563eb",
    buttonHoverColor: "#f3f4f6",
    overlayGradient: "bg-gradient-to-r from-black/50 via-black/30 to-transparent",
    containerMaxWidth: "max-w-6xl",
    heroHeight: "h-80 md:h-96",
    borderRadius: "rounded-3xl",
    shadowClass: "shadow-2xl",
    partnerStyles: {
        normal: "text-gray-400 text-2xl md:text-3xl font-bold opacity-60",
        bordered: "text-gray-400 text-2xl md:text-3xl font-bold opacity-60 border border-gray-300 px-3 py-1 rounded",
        italic: "text-gray-400 text-2xl md:text-3xl font-bold opacity-60 italic"
    }
};