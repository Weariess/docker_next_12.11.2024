'use client'
import { useState,useEffect } from "react";
import PocketBase from "pocketbase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoginForm } from "@/components/loginForm";


const pb = new PocketBase('http://172.16.15.138:8080');

export default function Home() {

  const [user,setUser]=useState(null)
  useEffect(()=>{
      setUser(pb.authStore.model)
  },[])
  const login = async ()=>{
    setUser(pb.authStore.model)
}
const logout = async()=>{
  pb.authStore.clear();
  setUser(null)
}

  return(
    <div>
    <div className="flex flex-row justify-end items-end">
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Avatar>
      <AvatarImage src={user && pb.files.getUrl(user, user.avatar)} alt="@shadcn" />
      <AvatarFallback>user</AvatarFallback>
    </Avatar>
    </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{user?user.username : "niezalogowany"}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {user?
    <DropdownMenuItem onClick={logout}>wyloguj</DropdownMenuItem>
    :
    <DropdownMenuItem asChild><LoginForm onLogin={login}>logowanie</LoginForm></DropdownMenuItem>
}
    <DropdownMenuItem>ustawienia</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

      
    </div>
    </div>
  )
}