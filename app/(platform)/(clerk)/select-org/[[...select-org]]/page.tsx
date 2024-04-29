import { OrganizationList } from "@clerk/nextjs";

export const SelectOrganizationPage = ()=>{
    return(
        <OrganizationList
         hidePersonal
         afterSelectOrganizationUrl={'/organization/:id'}
         afterCreateOrganizationUrl={'/organization/:id'}
        />
    )
}

export default SelectOrganizationPage;