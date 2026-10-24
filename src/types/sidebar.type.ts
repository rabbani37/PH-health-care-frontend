

//  {
//       title: "Management",
//       url: "#",
//       items: [
//         {
//           title: "Overview",
//           url: "#",
//         },
//         {
//           title: "Create Doctor",
//           url: "#",
//         },
//       ],
//     },


export interface SidebarItem {
    title: string;
    url: string;
}

export interface SidebarGroups {
    title: string;
    items: SidebarItem[]; // Note: This allows flat items. If items can have sub-items, see below.
}

// Change this to an array type:
export type SidebarItems = SidebarGroups[]; 
