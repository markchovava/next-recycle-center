export const AboutData = {
    title: `About Us`,
    intro: "A Smart Solution for Waste Sorting and Collection in Urban Zimbabwe",
    details: `
        RecycleMate is a conceptual smart solution designed to revolutionize waste sorting and 
        collection in urban Zimbabwe. It aims to address the challenges of inefficient waste management, 
        low recycling rates, and a lack of public awareness by leveraging mobile technology and 
        interactive features.
    `,
    solutions: {
        title: "Our Solutions",
        items: [
            { 
                id: 1, 
                title: "Pickup Schedule", 
                details: `Provide real-time waste pickup scheduling for residents.`, 
                iconType: "pickup", 
                css: "from-green-600 to-green-900"
            },
            {
                id: 2, 
                title: "Recycling Centers", 
                details: `List recycling centres and their accepted waste types.`, 
                iconType: "center", 
                css: "from-emerald-600 to-emerald-900"
            },
            { 
                id: 3, 
                title: "Educate & Promote", 
                details: `Educate users using visual and interactive content, and promote environmental awareness.`, 
                iconType: "educate", 
                css: "from-cyan-600 to-cyan-900"
            },
            {   
                id: 4, 
                title: "Updates & Reminders", 
                details: `To deliver updates and reminders via email notifications`, 
                iconType: "updates",
                css: "from-teal-600 to-teal-900"
            }
        ]
    }
}