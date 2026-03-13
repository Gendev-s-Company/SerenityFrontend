import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'

const CustomerChoice = () => {
    return (
        <div>
            <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Choisir un client</Label>
                        </div>
                        <Input id="password" type="text" name='oldpwd'

                            // value={forms.getForm && forms.getForm['oldpwd'] as string}
                            // onChange={(e) => forms.handleInputChange('oldpwd', e.target.value)}
                            required />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Nouveau mot de passe</Label>
                        </div>
                        <Input id="password" type="password" name='newPwd'
                            // value={forms.getForm && forms.getForm['newPwd'] as string}
                            // onChange={(e) => forms.handleInputChange('newPwd', e.target.value)}
                            required />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Confirmer mot de passe</Label>
                        </div>
                        <Input id="password" type="password" name='confirmpwd'
                            // value={forms.getForm && forms.getForm['confirmpwd'] as string}
                            // onChange={(e) => forms.handleInputChange('confirmpwd', e.target.value)}
                            required />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default CustomerChoice