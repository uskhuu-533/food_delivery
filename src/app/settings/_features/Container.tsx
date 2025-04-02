"use client";
import { PaginationComponent } from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/provider/UsersProvider";
import { parseAsInteger, useQueryState } from "nuqs";
import { UserDetail } from "../_components/UserDetail";

const Container = () => {
  const [page, setPage] = useQueryState("pages", parseAsInteger.withDefault(1));
  const { data } = useUsers();
  console.log(data);

  return (
    <div className="pr-8 pb-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">№</TableHead>
            <TableHead>email</TableHead>
            <TableHead>phone number</TableHead>
            <TableHead>email status</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>
                {user.phoneNumber ? user.phoneNumber : "no phone number"}
              </TableCell>
              <TableCell>
                {user.isVerrified ? "verrified" : "not verrified"}
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="cursor-pointer">
                <UserDetail user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent
        page={page}
        setPage={setPage}
        totalPages={data.totalPages}
      />
    </div>
  );
};
export default Container;
