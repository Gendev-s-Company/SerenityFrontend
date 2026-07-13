"use client";
import Sbutton from '@/components/button/Sbutton';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label";
import useForm from '@/hooks/use-form';
import { updatePassword } from '@/infrastructure/user/userRequest';
import { getLocalStorage } from '@/utils/storage';
import { useRouter } from "next/navigation";


const ModifyPasswordPage = () => {
  const user = getLocalStorage()!
   const router = useRouter();
  const body = {
    userID: user.userID,
    name: user.name || "",
    phone: user.phone || "",
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
      name:forms.getForm.name,
      phone:forms.getForm.phone,
      newPwd: forms.getForm.newPwd,
      oldpwd: forms.getForm.oldpwd,
      confirmpwd: forms.getForm.confirmpwd,
    }
    await updatePassword(formData);
  };
  const handleProfil = () => {
    router.push("/view/users/profil");

  }

  return (
    // classename taloha min-h-screen
        <div className="container mx-auto py-10 px-3">
          <Card className="w-full max-w-6xl mx-auto bg-slate-50/50">
            <CardHeader>
              <CardTitle>Modification de profil</CardTitle>
              <CardDescription>
                {"Remplir le formulaire pour modifier votre profil"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-8">
                  {/* Section 1 : Informations personnelles */}
                  {/* <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-semibold text-neutral-900">
                      Informations personnelles
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="name">Nom</Label>
                        </div>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={forms.getForm && forms.getForm['name'] as string}
                          onChange={(e) => forms.handleInputChange('name', e.target.value)}
                          placeholder='Votre nom complet'
                          required
                        />
                      </div>
                  
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="phone">Téléphone</Label>
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={forms.getForm && forms.getForm['phone'] as string}
                          onChange={(e) => forms.handleInputChange('phone', e.target.value)}
                          placeholder='Votre numéro de téléphone'
                          required
                        />
                      </div>
                    </div>
                  </div>
                   */}
                  {/* <Separator /> */}
                  
                  {/* Section 2 : Mot de passe */}
                  <div className="flex flex-col gap-4">
                    {/* <h3 className="text-sm font-semibold text-neutral-900">
                      Mot de passe
                    </h3> */}
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="oldpwd">Ancien mot de passe</Label>
                        </div>
                        <Input
                          id="oldpwd"
                          type="password"
                          name="oldpwd"
                          value={forms.getForm && forms.getForm['oldpwd'] as string}
                          onChange={(e) => forms.handleInputChange('oldpwd', e.target.value)}
                          placeholder='Votre ancien mot de passe'
                          required
                        />
                      </div>
                  
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label htmlFor="newPwd">Nouveau mot de passe</Label>
                          </div>
                          <Input
                            id="newPwd"
                            type="password"
                            name="newPwd"
                            value={forms.getForm && forms.getForm['newPwd'] as string}
                            onChange={(e) => forms.handleInputChange('newPwd', e.target.value)}
                            placeholder='Votre nouveau mot de passe'
                            required
                          />
                        </div>
                  
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label htmlFor="confirmpwd">Confirmer mot de passe</Label>
                          </div>
                          <Input
                            id="confirmpwd"
                            type="password"
                            name="confirmpwd"
                            value={forms.getForm && forms.getForm['confirmpwd'] as string}
                            onChange={(e) => forms.handleInputChange('confirmpwd', e.target.value)}
                            placeholder='Confirmer le nouveau mot de passe'
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                className="w-auto px-8"
                onClick={handleProfil}
              >
                Profil
              </Button>

              <Sbutton
                libelle="Modifier"
                message="Mot de passe mis à jour avec succès"
                className="w-auto px-8"
                formAction={formAction}
              />
            </CardFooter>
          </Card>
        </div>
  )
}

export default ModifyPasswordPage