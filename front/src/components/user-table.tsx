"use client";

import { FunctionComponent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/app/types/user";

interface UserTable {
  users: User[]
}

const UserTable: FunctionComponent<UserTable> = ({users}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (id: number) => {
    router.push(`/users/${id}`);
  };

  const isEndDatePassed = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-4">
        <Input
          placeholder="Search users by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">First name</TableHead>
                  <TableHead className="min-w-[100px]">Last name</TableHead>
                  <TableHead className="min-w-[100px]">Username</TableHead>
                  <TableHead className="min-w-[200px]">email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((painting) => (
                  <TableRow
                    key={painting.id}
                    onClick={() => handleRowClick(painting.id)}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                    {painting.firstName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {painting.lastName}
                    </TableCell>
                    <TableCell>{painting.username}</TableCell>
                    <TableCell>{painting.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );

};

export default UserTable;
