'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@sg/ui';
import { ChevronsUpDown, Handshake, Lightbulb, LogOut, User, X, Check } from 'lucide-react';
import { useI18n, flags } from '../../lib/i18n/i18nContext';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { locale, setLocale } = useI18n();
  const currentFlag = flags.find((f) => f.code === locale);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Lightbulb />
                Présenter SmartGarant
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User />
                Mon profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Handshake />
                Devenir Partenaire
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="space-x-2">
                  {currentFlag ? <img src={currentFlag.source} alt={currentFlag.name} className="h-4 w-4 rounded-sm" /> : null}
                  <span>Langue</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {flags.map((f) => (
                    <DropdownMenuItem
                      key={f.code}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setLocale(f.code);
                      }}
                    >
                      <img src={f.source} alt={f.name} className="h-4 w-6 rounded-sm" />
                      <span className="flex-1">{f.name}</span>
                      {f.code === locale ? <Check className="size-4 text-primary" /> : null}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Se déconnecté
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
