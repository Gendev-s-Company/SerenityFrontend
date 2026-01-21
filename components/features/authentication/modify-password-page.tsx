import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label";

const ModifyPasswordPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
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
                  <Label htmlFor="password">Mot de passe</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirmer mot de passe</Label>
                </div>
                <Input id="password" type="password" required />
              </div>

            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
          >
            VALIDER
          </Button>
          <Button className="cursor-pointer" variant="link">
            {"Besoin d'aide?"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ModifyPasswordPage