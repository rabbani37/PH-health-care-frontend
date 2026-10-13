import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
    { name: "Contact", url: "/contact" },
    // { name: "Login", url: "/login" },
    // { name: "Register", url: "/register" },
  ];

  return (
    <div className="w-full  bg-accent shadow flex items-center justify-between px-10">
      <h2 className="text-xl font-medium">PH Healthcare </h2>
      <nav className="flex items-center justify-center  h-13 gap-10 ">
        {routes.map((route) => (
          <Link key={route.url} href={route.url}>
            {" "}
            {route.name}
          </Link>
        ))}
      </nav>

      <Button
        variant={"default"}
        render={<Link href="/login"> Login</Link>}
        nativeButton={false}
      ></Button>
    </div>
  );
};

export default Header;
