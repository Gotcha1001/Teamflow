// "use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { getAvatar } from "@/lib/get-avatar";
// import { orpc } from "@/lib/orpc";
// import {
//   LogoutLink,
//   PortalLink,
// } from "@kinde-oss/kinde-auth-nextjs/components";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { CreditCard, LogOut, User } from "lucide-react";

// export function UserNav() {
//   const {
//     data: { user },
//   } = useSuspenseQuery(orpc.workspace.list.queryOptions());
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="size-12 rounded-xl hover:rounded-lg transition-all duration-200 bg-background/50 border-border/50 hover:bg-accent hover:text-accent-foreground"
//         >
//           <Avatar>
//             <AvatarImage
//               src={getAvatar(user.picture, user.email!)}
//               alt="User Image"
//               className="object-cover"
//             />
//             <AvatarFallback>
//               {user.given_name?.slice(0, 2).toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         align="end"
//         side="right"
//         sideOffset={8}
//         className="w-[200px]"
//       >
//         <DropdownMenuLabel className="font-normal flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//           <Avatar className="relative size-8 rounded-lg">
//             <AvatarImage
//               src={getAvatar(user.picture, user.email!)}
//               alt="User Image"
//               className="object-cover"
//             />
//             <AvatarFallback>
//               {user.given_name?.slice(0, 2).toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//           <div className="grid flex-1 text-left text-sm leading-tight">
//             <p className="truncate">{user.given_name}</p>
//             <p className="truncate text-muted-foreground text-xs">
//               WesleyOlivier443@gmail.com
//             </p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <PortalLink>
//                 <User />
//                 Account
//               </PortalLink>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <PortalLink>
//                 <CreditCard />
//                 Billing
//               </PortalLink>
//             </DropdownMenuItem>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem asChild>
//           <LogoutLink>
//             <LogOut />
//             Log out
//           </LogoutLink>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAvatar } from "@/lib/get-avatar";
import { orpc } from "@/lib/orpc";
import {
  LogoutLink,
  PortalLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useQuery } from "@tanstack/react-query"; // ← changed
import { CreditCard, LogOut, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // ← add if you have shadcn skeleton

export function UserNav() {
  const query = useQuery(orpc.workspace.list.queryOptions());

  // Loading state - nice skeleton instead of nothing
  if (query.isLoading) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="size-12 rounded-xl bg-background/50 border-border/50"
        disabled
      >
        <Skeleton className="size-10 rounded-full" />
      </Button>
    );
  }

  // Error state - fallback to a basic avatar or show something
  if (query.isError || !query.data?.user) {
    // You can log here during dev
    // console.error("UserNav query failed:", query.error);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-12 rounded-xl hover:rounded-lg transition-all duration-200 bg-background/50 border-border/50 hover:bg-accent hover:text-accent-foreground"
          >
            <Avatar>
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        {/* Minimal content or just log out button */}
        <DropdownMenuContent
          align="end"
          side="right"
          sideOffset={8}
          className="w-[200px]"
        >
          <DropdownMenuItem asChild>
            <LogoutLink>
              <LogOut />
              Log out
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const { user } = query.data;

  // Success - render full user nav
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-12 rounded-xl hover:rounded-lg transition-all duration-200 bg-background/50 border-border/50 hover:bg-accent hover:text-accent-foreground"
        >
          <Avatar>
            <AvatarImage
              src={getAvatar(user.picture, user.email ?? "")}
              alt="User Image"
              className="object-cover"
            />
            <AvatarFallback>
              {user.given_name?.slice(0, 2).toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="right"
        sideOffset={8}
        className="w-[200px]"
      >
        <DropdownMenuLabel className="font-normal flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="relative size-8 rounded-lg">
            <AvatarImage
              src={getAvatar(user.picture, user.email ?? "")}
              alt="User Image"
              className="object-cover"
            />
            <AvatarFallback>
              {user.given_name?.slice(0, 2).toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <p className="truncate">{user.given_name ?? "User"}</p>
            <p className="truncate text-muted-foreground text-xs">
              {user.email ?? "No email"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <PortalLink>
              <User />
              Account
            </PortalLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <PortalLink>
              <CreditCard />
              Billing
            </PortalLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <LogoutLink>
            <LogOut />
            Log out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
