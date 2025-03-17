import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@radix-ui/react-select";
// import { ChevronsUpDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
type Props = {
  form: UseFormReturn<
    {
      food_name: string;
      price: number;
      food_description: string;
      category: string;
    },
    any,
    undefined
  >;
  name: "food_name" | "price" | "food_description" | "category";
  type?: string;
  categories?: Response[];
  placeholder? : string
  label : string

};
type Response = {
  title: string;
  _id: string;
};
const FormsField = ({ form, name, type, categories, placeholder, label}: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl className="w-full">
            {name === "food_description" ? (
              <Textarea
                className="resize-none border"
                {...field}
                placeholder={placeholder}
              />
            ) : (
              <div className="w-full">
                {!categories ? (
                  <Input
                    type={type}
                    placeholder={placeholder}
                    {...field}
                  />
                ) : (
                  // <Select
                  //   onValueChange={(value) => {
                  //     console.log("Selected category ID:", value); // Debugging line
                  //     field.onChange(value.toString());
                  //     console.log("watch", form.watch("category"));
                  //   }}
                  //   value={
                  //     form.watch("category")
                  //   }
                  //   // defaultValue={food?.category?._id || ""}
                  // >
                  //   <SelectTrigger className="flex justify-between w-[375px] border py-2 px-5 rounded-md">
                  //     <SelectValue
                  //       placeholder={
                  //         field.value ? undefined : "Select a category"
                  //       } // Show placeholder only if value is empty
                  //       aria-label="Category selection"
                  //     />
                  //     <ChevronsUpDown />
                  //   </SelectTrigger>

                  //   <SelectContent className="bg-white flex flex-col gap-2 p-2 z-20 rounded-md bg-[#F4F4F5]">
                  //     {categories.map((category: Response, index) => (
                  //       <SelectItem
                  //         className="w-full bg-[#F4F4F5] rounded-full px-2"
                  //         key={index}
                  //         value={category._id.toString()}
                  //       >
                  //         {category.title}
                  //       </SelectItem>
                  //     ))}
                  //   </SelectContent>
                  // </Select>

                  <select
                    name="category"
                    value={form.watch("category")}
                    onChange={(value) => field.onChange(value)}
                  >
                    {categories.map((category: Response, index) => (
                      <option key={index} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </FormControl>
          <FormMessage />
          {field.value && (
            <button
              type="button"
              onClick={() => {
                field.onChange("");
              }}
              className="ml-2 text-red-500"
            >
              Clear
            </button>
          )}
        </FormItem>
      )}
    />
  );
};
export default FormsField;
