'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export default function CarteraWidget({ ens }: { ens: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className="w-full justify-start rounded-full pl-0 pr-4"
        >
          <Avatar className="mr-2 aspect-square h-12 w-12">
            <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
            <AvatarFallback>{ens[0]}</AvatarFallback>
          </Avatar>
          <span className="flex-grow text-center text-lg font-semibold">
            {ens}
          </span>
          <ChevronDown className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem>Copiar dirección</DropdownMenuItem>
        <DropdownMenuItem>Ver en explorador</DropdownMenuItem>
        <DropdownMenuItem>Historial</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
