"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export default function AuthenticationPage() {
  const formAction = () => {
    redirect("/view");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Serenity Application</CardTitle>
          <CardDescription>
            {"Application de gestion d'hotel et de restauration"}
          </CardDescription>
          {/* <CardAction>
            <Button className="cursor-pointer" variant="link">
              Créé un compte
            </Button>
          </CardAction> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={formAction}
            type="submit"
            className="w-full cursor-pointer"
          >
            Se connecter
          </Button>
          <Button className="cursor-pointer" variant="link">
            Créé un compte
          </Button>
          <a
            href="#"
            className="inline-block text-sm underline-offset-4 hover:underline"
            
          >
            Mot de passe oublié?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
