
const prefex= "/admin"

export const adminRoutes = [
    {
        title: "Management",
        items: [
            {
                title: "Overview",
                url: `${prefex}`,
            },
            {
                title: "Doctor Apploval",
                url: `${prefex}/approve-doctor`,
            },
            {
                title: "Create Doctor",
                url: "#",
            },
        ],
    },
    {
        title: "API Settings",
        items: [
            {
                title: "History",
                url: "#",
            },
            {
                title: "File Conventions",
                url: "#",
            },

        ],
    }
]