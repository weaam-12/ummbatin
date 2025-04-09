// src/data/services.js
export const services = [
    {
        id: 1,
        title: "Garbage",
        description: "Report issues related to garbage collection.",
        actions: [
            { label: "Submit Complaint", link: "/garbage-complaint" },
            { label: "Payment", link: "/garbage-payment" },
        ],
    },
    {
        id: 2,
        title: "Education",
        description: "Report issues related to schools or education services.",
        actions: [
            { label: "Submit Complaint", link: "/education-complaint" },
            { label: "Forms", link: "/education-forms" },
        ],
    },
    {
        id: 3,
        title: "Water",
        description: "Report issues related to water supply or billing.",
        actions: [
            { label: "Submit Complaint", link: "/water-complaint" },
            { label: "Payment", link: "/water-payment" },
        ],
    },
    {
        id: 4,
        title: "Property Tax (ארנונה)",
        description: "Report issues related to property tax payments.",
        actions: [
            { label: "Submit Complaint", link: "/property-tax-complaint" },
            { label: "Payment", link: "/property-tax-payment" },
        ],
    },
];