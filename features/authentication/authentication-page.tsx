"use client";
import Salert from "@/components/alert/Salert";
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
import useForm from "@/hooks/use-form";
import { login } from "@/infrastructure/user/userRequest";
import { setAuthStorage, userStorage } from "@/utils/storage";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthenticationPage() {
  const router = useRouter();
  const body = {
    userID: "",
    name: "UXUS",
    profil: "cdc",
    phone: "0320876534",
    joineddate: "",
    password: "1234",
    status: 0,
  };
  const forms = useForm(body);
  const [error, setError] = useState<boolean>(false);

  const formAction = async () => {
    console.log("En cours d'authentification");
    try {
      setError(false);
      const user = await login(forms.getForm);
      setAuthStorage(JSON.stringify(user));
      router.push("/view/users/company");
    } catch (error) {
      setError(true);
      throw error;
    }
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
                  type="text"
                  placeholder="0330099988"
                  name="phone"
                  value={forms.getForm && (forms.getForm["phone"] as string)}
                  onChange={(e) =>
                    forms.handleInputChange("phone", e.target.value)
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié?
                  </a> */}
                </div>
                <Input
                  id="password"
                  value={forms.getForm && (forms.getForm["password"] as string)}
                  name="password"
                  onChange={(e) =>
                    forms.handleInputChange("password", e.target.value)
                  }
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Sbutton
            message="Connexion réussi !"
            libelle="Se connecter"
            className="w-full"
            formAction={formAction}
          />
          {error && (
            <Salert
              title={"Erreur d'authentification"}
              message={"Identifiants invalides"}
              variant={"destructive"}
              Picon={AlertCircleIcon}
            />
          )}
          <Button className="cursor-pointer" variant="link">
            {"Besoin d'aide?"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
