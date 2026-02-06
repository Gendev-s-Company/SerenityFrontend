"use client";
import Sbutton from '@/components/button/Sbutton';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label";
import useForm from '@/hooks/use-form';
import { updatePassword } from '@/infrastructure/user/userRequest';
import { UserEntity } from '@/types/entity-type/userEntity';
import { getLocalStorage } from '@/utils/storage';

const ModifyPasswordPage = () => {
  const user = getLocalStorage() as UserEntity
  const body = {
    userID: user.userID,
    newPwd: "",
    oldpwd: "",
    confirmpwd: ""
  };
  const forms = useForm(body)
  const formAction = async () => {
    console.log("En cours d'authentification");

    console.log(forms.getForm);
    if (forms.getForm.newPwd !== forms.getForm.confirmpwd) {
      throw new Error("Veuillez mettre des mots de passes identique")
    }
    const formData = {
      userID: forms.getForm.userID!,
      newPwd: forms.getForm.newPwd,
      oldpwd: forms.getForm.oldpwd,
    }
    await updatePassword(formData);
  };

  return (
    // classename taloha min-h-screen
    <div className="flex w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Modification: mot de passe</CardTitle>
          <CardDescription>
            {"Remplir le formulaire pour modifier votre mot de passe"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Ancien mot de passe</Label>
                </div>
                <Input id="password" type="password" name='oldpwd' value={forms.getForm && forms.getForm['oldpwd'] as string}
                  onChange={(e) => forms.handleInputChange('oldpwd', e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Nouveau mot de passe</Label>
                </div>
                <Input id="password" type="password" name='newPwd' value={forms.getForm && forms.getForm['newPwd'] as string}
                  onChange={(e) => forms.handleInputChange('newPwd', e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirmer mot de passe</Label>
                </div>
                <Input id="password" type="password" name='confirmpwd' value={forms.getForm && forms.getForm['confirmpwd'] as string}
                  onChange={(e) => forms.handleInputChange('confirmpwd', e.target.value)} required />
              </div>

            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Sbutton libelle="Modifier" message='Mot de passe mis à jour avec succès' className="w-full" formAction={formAction} />

          <Button className="cursor-pointer" variant="link">
            {"Besoin d'aide?"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ModifyPasswordPage