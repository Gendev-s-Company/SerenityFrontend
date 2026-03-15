import Sbutton from '@/components/button/Sbutton'
import Forms from '@/components/form-component/Forms'
import { Field, FieldLabel } from '@/components/ui/field'
import { MultiSelect } from '@/components/ui/multi-select'
import { Switch } from '@/components/ui/switch'
import { CustomerNamefield } from '@/features/hotel/customer/prep-view-customer'
import useForm from '@/hooks/use-form'
import { createCustomer, getAllCustomer } from '@/infrastructure/hotel/customer/customerRequest'
import { FieldOptions } from '@/types/component-type/form-type'
import { CompanyEntity } from '@/types/entity-type/companyEntity'
import { CustomerEntity } from '@/types/entity-type/customerEntity'
import { getLocalStorage } from '@/utils/storage'
import React, { useEffect, useState } from 'react'

interface Form {
    handleForms: (name:string, value:string) => void;
}

const CustomerChoice = ({handleForms}:Form) => {
    const [filters, setFilters] = useState<FieldOptions[]>([]);
    const [customer, setCustomer] = useState<FieldOptions[]>([]);
    const [toogle, setToogle] = useState<boolean>(false)
    const user = getLocalStorage()!;
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (user && user?.profil?.company?.companyID) {
            getAllCustomer(user.profil.company.companyID)
                .then((data) => {
                    setCustomer(convertListCustomersToOption(data))
                })
                .catch((error) => console.log(error)
                )
        }
    }, []);
    const updateFilter = (filters: FieldOptions[]) => {
        setFilters(filters)
        const value = filters.length > 0 ? filters[0].id : ""
        console.log(value);
        handleForms("customerID", value)
    }
    
    const company: CompanyEntity = {
        skipValidation: true,
        companyID: user?.profil?.company.companyID,
        mail: "",
        name: "",
        phone: "",
        status: 0,
    };

    const body: CustomerEntity = {
        customerID: null,
        company: company,
        name: "",
        phone: "",
        mail: "",
        cin: "",
        address: "",
        status: 0,
        skipValidation: true,
    };
    const forms = useForm(body)
    const handleForm = (open:boolean) => {
        setToogle(open)
        forms.resetForm()
    }
    const submit = async () => {
        console.log(forms.getForm);
        const created = await createCustomer(forms.getForm);
        updateFilter(convertListCustomersToOption([created]))
        handleForm(false)
        
        
    }
    return (
        <div>
            {/* <form> */}
            <Field orientation="horizontal">
                <Switch checked={toogle} onCheckedChange={handleForm} id="switch-size-default" />
                <FieldLabel htmlFor="switch-size-default">Créé un nouveau client ?</FieldLabel>
            </Field>
            <div className="flex flex-col gap-6 p-3">
                <MultiSelect
                    setOpts={updateFilter}
                    safidy={filters}
                    opts={customer}
                    multi={false}
                    placeholder="Choisir les utilisateurs"
                    disable={toogle}
                />
            </div>
            {toogle &&
                <div>
                    <Forms forms={forms} fields={CustomerNamefield} />
                    <div className='p-4'>
                    <Sbutton message="Création réussi!" formAction={submit} />

                    </div>
                </div>
            }
            {/* </form> */}
        </div>
    )
}

export default CustomerChoice


export const convertListCustomersToOption = (list: CustomerEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.customerID) {
            result.push({ id: row.customerID, label: row.name })
        }
    }
    )
    return result;
}