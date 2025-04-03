"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUsers } from "@/provider/UsersProvider";
import { SearchIcon } from "lucide-react";

const SearchUser = () => {
  const { setSearhEmailValue, refetchUser, searchEmailValue } = useUsers();
  const clearSearch = async () => {
    await setSearhEmailValue('')
    await refetchUser()
  };
  return (
    <div className="flex pt-4 w-full gap-4">
      <Label className="flex items-center w-[500px]">
        <SearchIcon className="z-10 absolute left-2" />
        <Input
          className="rounded-full pl-10"
          placeholder="Search use by email"
          value={searchEmailValue}
          onChange={(e) => setSearhEmailValue(e.target.value)}
        />
      </Label>
      <Button className="px-3 rounded-full" onClick={refetchUser}>
        Search{" "}
      </Button>
      <Button onClick={clearSearch} className="bg-red-400">
        Clear
      </Button>
    </div>
  );
};
export default SearchUser;
