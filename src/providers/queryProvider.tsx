




"use client"

import { ReactNode } from 'react'
import {environmentManager, QueryClient, QueryClientProvider} from "@tanstack/react-query"



function makeQueryClient (){

    return new QueryClient({
        defaultOptions:{
            queries:{
                staleTime:60*1000,
            }
        }
    })
}


let browserQueryClient :QueryClient|undefined= undefined


function getQueryClient (){


    if(environmentManager.isServer()){

        return makeQueryClient()
    }
    else{

        if(!browserQueryClient){
             browserQueryClient = makeQueryClient()
        }
        
        return browserQueryClient
    }
}



export default function queryProvider({children}:{children:ReactNode}) {


    const queryclient = getQueryClient()

  return (
    <QueryClientProvider client={queryclient}> 
        {children}
    </QueryClientProvider>
  )
}
