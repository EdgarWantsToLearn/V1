'use client'

import { AccessTokenContext, WithAuth } from "@/app/hoc/with-auth"
import { useMe } from "@/app/hooks/use-me"
import { User } from "@/app/types/user"
import UserTable from "@/components/user-table"
import { getFollowers } from "@/utils/get-user-follow"
import { useContext, useEffect, useState } from "react"


const users = [
  { id: 1, firstName: 'John', lastName: 'Doe', username: 'johndoe', email: 'john@example.com' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', username: 'janesmith', email: 'jane@example.com' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', username: 'bobjohnson', email: 'bob@example.com' },
  { id: 4, firstName: 'Alice', lastName: 'Williams', username: 'alicew', email: 'alice@example.com' },
  { id: 5, firstName: 'Charlie', lastName: 'Brown', username: 'charlieb', email: 'charlie@example.com' },
  // Add more users as needed
]

const Followers = () => {
  const {accessToken} = useContext(AccessTokenContext)!
  const {me} = useMe()
  const [followers, setFollowers] = useState<User[]>([])

  useEffect(() => {
    async function get() {
      if (!me || !accessToken) {
        return
      }

      const followers = await getFollowers(me!.id, accessToken)
      setFollowers(followers)
    }

    get()
  }, [me])

  return <UserTable users={followers as any} />
}

export default WithAuth(Followers)