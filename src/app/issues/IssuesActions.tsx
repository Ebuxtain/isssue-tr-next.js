import React from 'react'
import { Button } from "@radix-ui/themes"
import Link from 'next/link';

const IssuesActions = () => {
  return (
    <div className='mb-5'>
    <Button>
       <Link href="/issues/new" className="no-underline text-white">
           New Issue
       </Link>
   </Button>
   </div>
  )
}

export default IssuesActions