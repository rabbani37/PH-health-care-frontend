"use client";
import Logo from "@/assets/svg/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
    { name: "Contact", url: "/contact" },
    // { name: "Login", url: "/login" },
    // { name: "Register", url: "/register" },
  ];

  const { data } = useGetMe();
  const { mutate: logout } = useLogout();

  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          type: "success", // or type: "success"
          title: "Logged out",
          description: "You have been securely signed out. See you soon!",
        });
        queryClient.removeQueries({queryKey:["user"]})
router.push("/login")
      },
      onError:(error)=>{
         toast.add({
        type: "error",
        title: "Logout Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
      }
    });
  };
  return (
    <div className="w-full  bg-accent shadow flex items-center justify-between px-10">
      <div className="flex items-center justify-center gap-1">
        <Logo />
        <h2 className="text-xl font-medium">PH Healthcare </h2>
      </div>
      <nav className="flex items-center justify-center  h-13 gap-10 ">
        {routes.map((route) => (
          <Link key={route.url} href={route.url}>
            {" "}
            {route.name}
          </Link>
        ))}
      </nav>

      { !data && (
        <Button
          variant={"default"}
          render={<Link href="/login"> Login</Link>}
          nativeButton={false}
        ></Button>
      )}
      { data && <Button onClick={handleLogout} variant={"destructive"}>Logout</Button>}
    </div>
  );
};

export default Header;
