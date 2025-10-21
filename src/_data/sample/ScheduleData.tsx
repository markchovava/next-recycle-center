

export const ScheduleData = [
  {
    id: 1,
    centerId: 101,
    userId: 501,
    center: "Main Distribution Hub",
    time: "08:00 AM",
    createdAt: "01 September 2024",
    updatedAt: "01 September 2024",
  },
  {
    id: 2,
    centerId: 102,
    userId: 502,
    center: "North Side Warehouse",
    time: "09:30 AM",
    createdAt: "01 September 2024",
    updatedAt: "02 September 2024",
  },
  {
    id: 3,
    centerId: 101,
    userId: 503,
    center: "Main Distribution Hub",
    time: "11:00 AM",
    createdAt: "02 September 2024",
    updatedAt: "02 September 2024",
  },
  {
    id: 4,
    centerId: 103,
    userId: 501,
    center: "Downtown Service Point",
    time: "01:00 PM",
    createdAt: "02 September 2024",
    updatedAt: "03 September 2024",
  },
  {
    id: 5,
    centerId: 104,
    userId: 504,
    center: "West Logistics Center",
    time: "02:45 PM",
    createdAt: "03 September 2024",
    updatedAt: "03 September 2024",
  },
  {
    id: 6,
    centerId: 102,
    userId: 505,
    center: "North Side Warehouse",
    time: "04:00 PM",
    createdAt: "03 September 2024",
    updatedAt: "04 September 2024",
  },
  {
    id: 7,
    centerId: 105,
    userId: 502,
    center: "Airport Freight Terminal",
    time: "06:30 PM",
    createdAt: "04 September 2024",
    updatedAt: "04 September 2024",
  },
  {
    id: 8,
    centerId: 103,
    userId: 506,
    center: "Downtown Service Point",
    time: "07:00 AM",
    createdAt: "05 September 2024",
    updatedAt: "05 September 2024",
  },
  {
    id: 9,
    centerId: 104,
    userId: 503,
    center: "West Logistics Center",
    time: "10:15 AM",
    createdAt: "05 September 2024",
    updatedAt: "06 September 2024",
  },
  {
    id: 10,
    centerId: 105,
    userId: 504,
    center: "Airport Freight Terminal",
    time: "12:30 PM",
    createdAt: "06 September 2024",
    updatedAt: "06 September 2024",
  },
];


export const ScheduleCustomerStatusData = [
  "Requested", 
  "Collected",
]

export const ScheduleRecyclerStatusData = [
  "Received", 
  'In-Transit',
  "Collected",
]



export const ScheduleNavData = [
    {
        id: 1, 
        title: "All Customers", 
        href: "/admin/schedule/customer",
        desc: "The service recepient.", 
        iconType: "user", 
        css: "text-green-600"
    },
    {
        id: 2, 
        title: "All Recyclers", 
        href: "/admin/schedule/recycler",
        desc: "The service provider.", 
        iconType: "users", 
        css: "text-blue-600"
    },
    {
        id: 3, 
        title: "My Schedule", 
        href: "/admin/schedule/my/customer",
        desc: "For Customers.", 
        iconType: "schedule", 
        css: "text-rose-600"
    },
     {
        id: 4, 
        title: "My Schedule", 
        href: "/admin/schedule/my/recycler",
        desc: "For Recyclers.", 
        iconType: "schedule", 
        css: "text-cyan-600"
    },
]