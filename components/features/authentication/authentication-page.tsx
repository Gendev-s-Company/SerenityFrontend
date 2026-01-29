"use client";
import Sbutton from "@/components/button/Sbutton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/infrastructure/user/userRequest";
import { UserEntity } from "@/types/entity-type/userEntity";
import { useRouter } from "next/navigation";

export default function AuthenticationPage() {
  const router = useRouter();
  const body: UserEntity = {
      userID: "",
      name: "",
      profil: { profilID: "", name: "", companyid: "", authority: 0 },
      phone: "",
      joineddate: "",
      password: "",
      status: 0,
    };
  const formAction =  async () => {
    console.log("En cours d'authentification");
    await login(body);
    router.push("/view");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Serenity Application</CardTitle>
          <CardDescription>
            {"Application de gestion d'hotel et de restauration"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Téléphone</Label>
                <Input
                  id="email"
                  type="phone"
                  placeholder="m@example.com"
                  value={"0320379216"}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié?
                  </a>
                </div>
                <Input id="password" value={"1234"} type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Sbutton libelle="Se connecter" className="w-full" formAction={formAction} />
          <Button className="cursor-pointer" variant="link">
            {"Besoin d'aide?"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
