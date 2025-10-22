export const RolesData = [
    {id: 1, name: "Default", value: 1 },
    {id: 3, name: "Customer", value: 2 },
    {id: 2, name: "Recycler", value: 3 },
]


export function UserRole(level: number | string) {
      const r = RolesData.find(i => i.value === Number(level));
      if(r){
        return r?.name
      }
      return ""
    }